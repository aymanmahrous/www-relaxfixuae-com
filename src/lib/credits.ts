import { useEffect, useState, useCallback } from "react";
import { useSettings } from "./settings";

/**
 * ---------------------------------------------------------
 *  نظام الكريدت الجديد للـ AI Studio (صور + فيديو)
 * ---------------------------------------------------------
 */

export const CREDIT_COST = {
  image: 5,
  video_8: 15,
  video_15: 25,
  video_30_default: 40,
  video_30_runway: 50,
} as const;

export function getVideoCreditCost(
  duration: 8 | 15 | 30,
  provider: "kling" | "runway" | "hailuo"
) {
  if (duration === 8) return CREDIT_COST.video_8;
  if (duration === 15) return CREDIT_COST.video_15;
  if (duration === 30 && provider === "runway")
    return CREDIT_COST.video_30_runway;
  return CREDIT_COST.video_30_default;
}

/**
 * ---------------------------------------------------------
 *  نظام الكريدت القديم (localStorage)
 *  — أبقيناه كما هو بدون أي حذف
 * ---------------------------------------------------------
 */

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

  const spend = useCallback(
    (n = 1) => {
      const raw = localStorage.getItem(KEY);
      const cur = raw ? parseInt(raw, 10) : welcome;
      if (cur < n) return false;
      const next = cur - n;
      localStorage.setItem(KEY, String(next));
      setCredits(next);
      return true;
    },
    [welcome]
  );

  const reset = useCallback(() => {
    localStorage.setItem(KEY, String(welcome));
    setCredits(welcome);
  }, [welcome]);

  return { credits, spend, reset, welcome };
}
