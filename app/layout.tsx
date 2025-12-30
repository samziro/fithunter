import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fit Hunter | Personal Trainer in Watamu, Kenya",
    template: "%s | Fit Hunter - Personal Trainer Watamu",
  },
  description:
    "Certified personal trainer in Watamu, Kenya. Affordable one-on-one sessions, group classes, beach workouts, and online coaching to help you build strength and confidence.",
  keywords: [
    "personal trainer Watamu",
    "fitness coach Kenya",
    "beach workouts Watamu",
    "personal training Kilifi",
    "online fitness coaching Kenya",
    "strength training Watamu",
    "affordable personal trainer Kenya",
  ],
  authors: [{ name: "Fit Hunter", url: "https://the-hunter-iron.vercel.app" }],
  creator: "Fit Hunter",
  publisher: "Fit Hunter",
  metadataBase: new URL("https://the-hunter-iron.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fit Hunter | Personal Trainer in Watamu, Kenya",
    description:
      "Get fit with personalized training in Watamu. Beach sessions, custom plans, and expert guidance starting at KSh 2,000.",
    url: "https://the-hunter-iron.vercel.app",
    siteName: "Fit Hunter",
    images: [
      {
        url: "/og-image.jpg", // Recommended: Create a dedicated 1200x630 OG image
        width: 1200,
        height: 630,
        alt: "Fit Hunter personal trainer leading a beach workout in Watamu, Kenya",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fit Hunter | Personal Trainer Watamu",
    description:
      "Certified trainer offering affordable beach workouts and custom fitness plans in Watamu, Kenya.",
    images: ["/og-image.jpg"],
    creator: "@The_Fithunter",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-inter bg-[#0A0F1E] text-white antialiased`}
      >
        {/* Accessible landmark */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-yellow-600 focus:px-4 focus:py-2 focus:rounded-md">
          Skip to main content
        </a>

        <div className="flex min-h-dvh flex-col">
          <header>{/* Header component will be rendered via page layout */}</header>

          <main id="main-content" className="flex-1">
            {children}
          </main>

          <footer>{/* Footer component will be rendered via page layout */}</footer>
        </div>
      </body>
    </html>
  );
}