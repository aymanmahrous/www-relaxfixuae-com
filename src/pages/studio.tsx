import { StudioTabs } from "../components/studio/StudioTabs";

export default function StudioPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">AI Studio</h1>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        أنشئ فيديوهات وصور احترافية خلال ثوانٍ — مدعوم بالذكاء الاصطناعي.
      </p>

      <StudioTabs />
    </div>
  );
}
