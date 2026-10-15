import { Inter, Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileActionBar from "@/components/layout/MobileActionBar";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import QuickPriceFloat from "@/components/layout/QuickPriceFloat";
import JsonLd from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/content/company";
import { businessSchema, websiteSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/* الهوية تعتمد Arial (جروتسك محايد). على الويب نستخدم
   Rubik للعربي — خط متغيّر فتعمل كل الأوزان فعلياً — وInter للاتيني. */
const arabic = Rubik({
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
    default: "شركة تنظيف في الرياض | الزامل كلين — نظافة تأهيلية وتنظيف عميق",
    template: "%s | الزامل كلين",
  },
  description:
    "شركة تنظيف منازل وفلل ومنشآت في الرياض. نظافة تأهيلية بعد التشطيب، تنظيف عميق وتعقيم، تنظيف كنب وسجاد وستائر، غسيل خزانات المياه، واجهات وأحواش، ومكافحة حشرات. احجز عبر واتساب.",
  applicationName: COMPANY.nameAr,
  authors: [{ name: COMPANY.nameAr }],
  creator: COMPANY.nameAr,
  publisher: COMPANY.nameAr,
  category: "خدمات التنظيف",
  keywords: [
    "شركة تنظيف بالرياض",
    "تنظيف منازل الرياض",
    "تنظيف فلل بالرياض",
    "نظافة تأهيلية بعد التشطيب",
    "تنظيف عميق وتعقيم",
    "تنظيف كنب بالبخار",
    "تنظيف سجاد وموكيت",
    "غسيل خزانات المياه",
    "تنظيف واجهات زجاج",
    "مكافحة حشرات بالرياض",
    "عقود نظافة للمنشآت",
    "الزامل كلين",
  ],
  alternates: {
    canonical: "/",
    languages: { "ar-SA": "/" },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: COMPANY.nameAr,
    title: "شركة تنظيف في الرياض | الزامل كلين",
    description:
      "حلول تنظيف متكاملة للمنازل والفلل والمنشآت في الرياض — فريق متخصص، معدات حديثة، ومواد آمنة ومعتمدة.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة تنظيف في الرياض | الزامل كلين",
    description:
      "نظافة تأهيلية، تنظيف عميق، كنب وسجاد وستائر، خزانات، واجهات، ومكافحة حشرات — في الرياض.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
};

export const viewport = {
  themeColor: "#082F49",
  // لازم حتى تعمل env(safe-area-inset-bottom) في شريط إجراءات الجوال
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${arabic.variable} ${inter.variable}`}
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
        <QuickPriceFloat />
        <MobileActionBar />
        <JsonLd data={[businessSchema, websiteSchema]} />
      </body>
    </html>
  );
}
