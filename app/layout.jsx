import { Readex_Pro, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import { CITIES } from "@/lib/content/cities";
import { COMPANY, OPENING_HOURS } from "@/lib/content/company";
import { ACTIVE_SOCIALS } from "@/lib/content/socials";
import { SITE_URL } from "@/lib/site";

/* الهوية تعتمد Arial (جروتسك محايد). على الويب نستخدم
   Readex Pro للعربي — خط متغيّر فتعمل كل الأوزان 400→700 فعلياً —
   وInter للاتيني. */
const readex = Readex_Pro({
  subsets: ["arabic"], // اللاتيني يأتي من Inter — لا داعي لتحميله مرتين

  variable: "--font-readex",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "الزامل كلين | شركة تنظيف في الرياض — نظافة تأهيلية وتنظيف عميق",
    template: "%s | الزامل كلين",
  },
  description:
    "الزامل كلين — شركة تنظيف متخصصة في الرياض. نظافة تأهيلية بعد التشطيب، تنظيف عميق وتعقيم، كنب وسجاد وستائر، خزانات مياه، واجهات وأحواش، ومكافحة حشرات. باقات دورية وعقود للمنشآت.",
  keywords: [
    "شركة تنظيف الرياض",
    "نظافة تأهيلية",
    "تنظيف عميق",
    "تنظيف كنب",
    "تنظيف سجاد",
    "تنظيف ستائر",
    "غسيل خزانات",
    "تنظيف واجهات",
    "مكافحة حشرات",
    "عقود نظافة",
    "الزامل كلين",
  ],
  authors: [{ name: COMPANY.nameAr }],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: COMPANY.nameAr,
    title: "الزامل كلين | مساحة أنقى، إحساس أجمل",
    description:
      "حلول تنظيف متكاملة للمنازل والفلل والمنشآت — فريق موحّد، معدات حديثة، ومواد آمنة ومعتمدة.",
    url: SITE_URL,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#082F49",
  // لازم حتى تعمل env(safe-area-inset-bottom) في شريط إجراءات الجوال
  viewportFit: "cover",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.nameAr,
  alternateName: COMPANY.nameEn,
  description:
    "شركة تنظيف متخصصة في الرياض — نظافة تأهيلية، تنظيف عميق، مفروشات، خزانات، واجهات ومكافحة حشرات.",
  url: SITE_URL,
  telephone: `+${COMPANY.phoneIntl}`,
  email: COMPANY.email,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "الرياض",
    addressCountry: "SA",
  },
  // الجمعة بموعد مسبق فلا تُدرج ضمن الأوقات الثابتة
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OPENING_HOURS.days,
      opens: OPENING_HOURS.opens,
      closes: OPENING_HOURS.closes,
    },
  ],
  areaServed: CITIES.map((c) => ({ "@type": "City", name: c.name })),
  ...(ACTIVE_SOCIALS.length > 0 && {
    sameAs: ACTIVE_SOCIALS.map((s) => s.href),
  }),
  priceRange: "$$",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${readex.variable} ${inter.variable}`}
    >
      <head>
        {/* يفعّل حركات الظهور فقط عند توفّر جافاسكربت */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:inset-s-3 focus:top-3 focus:z-100 focus:rounded-full focus:bg-navy focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
        >
          تخطّي إلى المحتوى
        </a>
        <Navbar />
        <main id="main" className="pt-(--nav-h)">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileActionBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
