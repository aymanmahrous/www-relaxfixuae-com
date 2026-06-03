import { useEffect, useState, useCallback } from "react";
import { useSettings } from "./settings";

const KEY = "pr_credits_v1";

export function useCredits() {
  const { settings } = useSettings();
  const welcome = settings.welcomeCredits;
  const [credits, setCredits] = useState<number>(welcome);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem(KEY);
    if (raw === null) {
      localStorage.setItem(KEY, String(welcome));
      setCredits(welcome);
    } else {
      const n = parseInt(raw, 10);
      setCredits(Number.isFinite(n) ? n : welcome);
    }
  }, [welcome]);

  const spend = useCallback((n = 1) => {
    const raw = localStorage.getItem(KEY);
    const cur = raw ? parseInt(raw, 10) : welcome;
    if (cur < n) return false;
    const next = cur - n;
    localStorage.setItem(KEY, String(next));
    setCredits(next);
    return true;
  }, [welcome]);

  const reset = useCallback(() => {
    localStorage.setItem(KEY, String(welcome));
    setCredits(welcome);
  }, [welcome]);

  return { credits, spend, reset, welcome };
}
