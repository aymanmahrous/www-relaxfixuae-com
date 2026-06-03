import { useEffect } from "react";
import { useSettings } from "@/lib/settings";

// Injects GA4 + Meta Pixel client-side based on admin settings.
// Safe no-op when IDs aren't configured.
export function AnalyticsInjector() {
  const { settings } = useSettings();
  const { gaId, metaPixelId } = settings;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!gaId) return;
    if (document.getElementById("ga-script")) return;
    const s = document.createElement("script");
    s.id = "ga-script";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(s);
    const inline = document.createElement("script");
    inline.id = "ga-inline";
    inline.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`;
    document.head.appendChild(inline);
  }, [gaId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!metaPixelId) return;
    if (document.getElementById("fb-pixel")) return;
    const s = document.createElement("script");
    s.id = "fb-pixel";
    s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`;
    document.head.appendChild(s);
  }, [metaPixelId]);

  return null;
}
