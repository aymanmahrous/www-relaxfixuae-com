import { useEffect, useState, useCallback } from "react";

const KEY = "pr_credits_v1";
const WELCOME = 5;

function read(): number {
  if (typeof window === "undefined") return WELCOME;
  const raw = localStorage.getItem(KEY);
  if (raw === null) {
    localStorage.setItem(KEY, String(WELCOME));
    return WELCOME;
  }
  const n = parseInt(raw, 10);
  return Number.isFinite(n) ? n : WELCOME;
}

export function useCredits() {
  const [credits, setCredits] = useState<number>(WELCOME);

  useEffect(() => {
    setCredits(read());
  }, []);

  const spend = useCallback((n = 1) => {
    const cur = read();
    if (cur < n) return false;
    const next = cur - n;
    localStorage.setItem(KEY, String(next));
    setCredits(next);
    return true;
  }, []);

  const reset = useCallback(() => {
    localStorage.setItem(KEY, String(WELCOME));
    setCredits(WELCOME);
  }, []);

  return { credits, spend, reset, welcome: WELCOME };
}
