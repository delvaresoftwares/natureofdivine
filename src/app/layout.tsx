import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Toaster } from "@/components/ui/toaster";
import { SITE, BOOK, META, SCHEMA } from "@/lib/constants";
import { LocationProvider } from "@/hooks/useLocation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--font-garamond",
});

const siteUrl = process.env.NEXT_PUBLIC_HOST_URL || `https://${SITE.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: META.defaultTitle,
    template: META.titleTemplate,
  },
  description: META.description,
  keywords: META.keywords,
  authors: [{ name: SITE.author, url: siteUrl }],
  creator: SITE.author,
  publisher: SCHEMA.publisher,
  category: "Religion & Spirituality",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: META.ogTitle,
    description: META.ogDescription,
    url: siteUrl,
    siteName: META.siteName,
    images: [
      {
        url: META.ogImage,
        alt: META.siteName,
      },
    ],
    locale: META.locale,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: META.twitterTitle,
    description: META.twitterDescription,
    images: [META.twitterImage],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: BOOK.title,
    author: {
      "@type": "Person",
      name: SITE.author,
      url: siteUrl,
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "Kerala",
      },
    },
    publisher: {
      "@type": "Organization",
      name: SCHEMA.publisher,
    },
    inLanguage: "en",
    isbn: SCHEMA.isbn,
    bookFormat: "http://schema.org/Paperback",
    url: siteUrl,
    description: SCHEMA.description,
    genre: SCHEMA.bookGenre,
    audience: SCHEMA.audience,
    datePublished: SCHEMA.datePublished,
    image: `${siteUrl}/logo.svg`,
    offers: {
      "@type": "Offer",
      price: BOOK.price,
      priceCurrency: BOOK.currency,
      availability: "https://schema.org/InStock",
      url: siteUrl,
      seller: {
        "@type": "Organization",
        name: "Nature of the Divine",
      },
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: siteUrl,
    description: META.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          garamond.variable
        )}
      >
        <LocationProvider>
          <div className="relative flex min-h-screen flex-col pb-20 md:pb-0">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <MobileBottomNav />
          </div>
          <Toaster />
        </LocationProvider>
      </body>
    </html>
  );
}