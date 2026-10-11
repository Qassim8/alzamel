import {
  Noto_Sans_Arabic,
  Inter,
  Rubik,
  Amiri,
  IBM_Plex_Sans_Arabic,
  Readex_Pro,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { COMPANY } from "@/lib/data";

/* الهوية تعتمد Arial (جروتسك محايد) — والمقابل الأمثل على الويب:
   Noto Sans Arabic للعربي + Inter للاتيني. */
const arabic = Readex_Pro({
  subsets: ["arabic"],
  variable: "--font-ar",
  weight: ["400", "700"],
  display: "swap",
});

const latin = Inter({
  subsets: ["latin"],
  variable: "--font-latin",
  weight: ["400", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.alzamil-clean.sa";

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
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#082F49",
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
  image: `${SITE_URL}/images/home-detail.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "الرياض",
    addressCountry: "SA",
  },
  areaServed: "SA",
  priceRange: "$$",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${arabic.variable} ${latin.variable}`}
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:rounded-full focus:bg-navy focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
        >
          تخطّي إلى المحتوى
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
