import { useState } from "react";
import { VideoStudio } from "./VideoStudio";
import { ImageStudio } from "./ImageStudio";
import { SocialKit } from "./SocialKit";

export function StudioTabs() {
  const [tab, setTab] = useState<"video" | "image" | "social">("video");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setTab("video")}
          className={`px-3 py-1.5 rounded-full border ${
            tab === "video"
              ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]/10"
              : "border-[var(--border-subtle)]"
          }`}
        >
          Video Studio
        </button>

        <button
          onClick={() => setTab("image")}
          className={`px-3 py-1.5 rounded-full border ${
            tab === "image"
              ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10"
              : "border-[var(--border-subtle)]"
          }`}
        >
          Image Studio
        </button>

        <button
          onClick={() => setTab("social")}
          className={`px-3 py-1.5 rounded-full border ${
            tab === "social"
              ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]/10"
              : "border-[var(--border-subtle)]"
          }`}
        >
          Social Media Kit
        </button>
      </div>

      {/* Content */}
      <div>
        {tab === "video" && <VideoStudio />}
        {tab === "image" && <ImageStudio />}
        {tab === "social" && <SocialKit />}
      </div>
    </div>
  );
}
