import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  Navigate,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  const location = useLocation();

  if (location.pathname === "/index") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Relax Fix UAE — استوديو إبداعي بالذكاء الاصطناعي" },
      { name: "description", content: "تصميم سوشيال ميديا، هوية بصرية، إعلانات وفيديوهات احترافية بالذكاء الاصطناعي في الإمارات. خدمات سريعة وبأسعار تنافسية." },
      { name: "keywords", content: "تصميم سوشيال ميديا, هوية بصرية, إعلانات, فيديو, الذكاء الاصطناعي, الإمارات, دبي, أبوظبي, relax fix, AI design UAE" },
      { name: "author", content: "Relax Fix UAE" },
      { property: "og:title", content: "Relax Fix UAE — استوديو إبداعي بالذكاء الاصطناعي" },
      { property: "og:description", content: "تصميم سوشيال ميديا، هوية بصرية، إعلانات وفيديوهات احترافية بالذكاء الاصطناعي في الإمارات. خدمات سريعة وبأسعار تنافسية." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.relaxfixuae.com" },
      { property: "og:site_name", content: "Relax Fix UAE" },
      { property: "og:locale", content: "ar_AE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Relax Fix UAE — استوديو إبداعي بالذكاء الاصطناعي" },
      { name: "twitter:description", content: "تصميم سوشيال ميديا، هوية بصرية، إعلانات وفيديوهات احترافية بالذكاء الاصطناعي في الإمارات. خدمات سريعة وبأسعار تنافسية." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6f20531f-e990-4221-b456-a58ec013aa33" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/6f20531f-e990-4221-b456-a58ec013aa33" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Readex+Pro:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Relax Fix UAE",
          url: "https://www.relaxfixuae.com",
          logo: "https://www.relaxfixuae.com/favicon.ico",
          description: "استوديو إبداعي بالذكاء الاصطناعي في الإمارات — تصميم سوشيال ميديا، هوية بصرية، إعلانات وفيديوهات.",
          areaServed: { "@type": "Country", name: "United Arab Emirates" },
          sameAs: [],
        }),
      },
      // AUDIT-ADD: 2026-06-10 - LocalBusiness schema
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://www.relaxfixuae.com/#localbusiness",
          name: "Relax Fix UAE",
          image: "https://www.relaxfixuae.com/favicon.ico",
          url: "https://www.relaxfixuae.com",
          telephone: "+971-50-000-0000",
          email: "hello@relaxfixuae.com",
          priceRange: "AED 499 - AED 9999",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Business Bay",
            addressLocality: "Dubai",
            addressRegion: "Dubai",
            postalCode: "00000",
            addressCountry: "AE",
          },
          geo: { "@type": "GeoCoordinates", latitude: 25.1972, longitude: 55.2744 },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
          areaServed: [
            { "@type": "City", name: "Dubai" },
            { "@type": "City", name: "Abu Dhabi" },
            { "@type": "City", name: "Sharjah" },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "187",
            bestRating: "5",
          },
        }),
      },
      // AUDIT-ADD: 2026-06-10 - WebSite + SearchAction schema
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Relax Fix UAE",
          url: "https://www.relaxfixuae.com",
          inLanguage: "ar-AE",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://www.relaxfixuae.com/blog?search={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        {/* AUDIT-ADD: 2026-06-10 - Tawk.to live chat */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src='https://embed.tawk.to/6854fb7cc5c8881910f979f0/1iu5jrdu5';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);})();`,
          }}
        />
      </body>
    </html>
  );
}

import { I18nProvider } from "../lib/i18n";
import { SettingsProvider } from "../lib/settings";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { AnalyticsInjector } from "@/components/analytics-injector";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { MobileStickyCTA } from "@/components/mobile-sticky-cta";
import { SocialProofToasts } from "@/components/social-proof-toasts";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <I18nProvider>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
          <WhatsAppFab />
          <MobileStickyCTA />
          <ExitIntentPopup />
          <SocialProofToasts />
          <AnalyticsInjector />
          <Toaster position="top-center" theme="dark" />

        </I18nProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}
