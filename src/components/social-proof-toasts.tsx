import { useEffect } from "react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

type Activity = {
  nameAr: string;
  nameEn: string;
  cityAr: string;
  cityEn: string;
  serviceAr: string;
  serviceEn: string;
  minutesAgo: number;
};

const ACTIVITIES: Activity[] = [
  { nameAr: "أحمد", nameEn: "Ahmed", cityAr: "دبي", cityEn: "Dubai", serviceAr: "تصميم 5 منشورات سوشيال ميديا", serviceEn: "5 social media posts", minutesAgo: 3 },
  { nameAr: "فاطمة", nameEn: "Fatima", cityAr: "أبوظبي", cityEn: "Abu Dhabi", serviceAr: "هوية بصرية كاملة", serviceEn: "Full brand identity", minutesAgo: 7 },
  { nameAr: "محمد", nameEn: "Mohammed", cityAr: "الشارقة", cityEn: "Sharjah", serviceAr: "إعلان فيديو ريلز", serviceEn: "Reels video ad", minutesAgo: 12 },
  { nameAr: "سارة", nameEn: "Sarah", cityAr: "دبي", cityEn: "Dubai", serviceAr: "باقة شهرية محتوى", serviceEn: "Monthly content plan", minutesAgo: 18 },
  { nameAr: "خالد", nameEn: "Khalid", cityAr: "العين", cityEn: "Al Ain", serviceAr: "شعار + كرت أعمال", serviceEn: "Logo + business cards", minutesAgo: 24 },
  { nameAr: "نورة", nameEn: "Noura", cityAr: "دبي", cityEn: "Dubai", serviceAr: "تصوير منتجات بالـ AI", serviceEn: "AI product photography", minutesAgo: 32 },
  { nameAr: "علي", nameEn: "Ali", cityAr: "رأس الخيمة", cityEn: "Ras Al Khaimah", serviceAr: "مونتاج فيديو إعلاني", serviceEn: "Promo video edit", minutesAgo: 41 },
  { nameAr: "مريم", nameEn: "Mariam", cityAr: "عجمان", cityEn: "Ajman", serviceAr: "10 منشورات إنستجرام", serviceEn: "10 Instagram posts", minutesAgo: 55 },
];

export function SocialProofToasts() {
  const { lang } = useI18n();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let idx = Math.floor(Math.random() * ACTIVITIES.length);
    let timeoutId: number;

    const showNext = () => {
      const a = ACTIVITIES[idx % ACTIVITIES.length];
      idx++;
      const ar = lang === "ar";
      const title = ar ? `${a.nameAr} من ${a.cityAr}` : `${a.nameEn} from ${a.cityEn}`;
      const desc = ar
        ? `طلب ${a.serviceAr} • قبل ${a.minutesAgo} دقيقة`
        : `Ordered ${a.serviceEn} • ${a.minutesAgo} min ago`;

      toast(title, {
        description: desc,
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        position: "bottom-left",
        duration: 5000,
      });

      // Next toast in 18-32 seconds
      timeoutId = window.setTimeout(showNext, 18000 + Math.random() * 14000);
    };

    // First toast after 12 seconds
    timeoutId = window.setTimeout(showNext, 12000);

    return () => window.clearTimeout(timeoutId);
  }, [lang]);

  return null;
}
