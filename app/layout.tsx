import type { Metadata } from "next";
import {Outfit } from "next/font/google";
import "./globals.css";
// import Analytics from "@/components/analytics";

// Fonts
// const pacifico = Pacifico({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-pacifico",
// });

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title:
    "Fit Hunter | Personal Trainer Watamu | Affordable Fitness Coaching Kenya",
  description:
    "Fit Hunter offers personalized fitness coaching in Watamu, Kenya. Achieve your goals with beach workouts and custom programs starting at KES 2000. Preying on fitness goals one rep at a time.",
  keywords: [
    "Fit Hunter",
    "personal trainer Watamu",
    "fitness coaching Kenya",
    "beach workouts Watamu",
    "affordable personal training Watamu",
    "defined abs routines Kenya",
    "custom workouts Watamu",
    "online coaching Kenya",
  ],
  authors: [{ name: "Fit Hunter" }],
  openGraph: {
    title: "Fit Hunter | Personal Trainer Watamu Kenya",
    description:
      "Transform your health with expert personal trainer Watamu services. Affordable programs at KES 2000, including beach workouts and online coaching. Preying on fitness goals one rep at a time.",
    url: "https://the-hunter-iron.vercel.app/",
    siteName: "Fit Hunter",
    images: [
      {
        url: "/mike.jpg",
        width: 1200,
        height: 630,
        alt: "Personal trainer Watamu leading beach workouts at Fit Hunter",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fit Hunter | Fitness Coaching Kenya in Watamu",
    description:
      "Dedicated personal trainer Watamu offering affordable fitness programs at KES 2000. From defined abs to custom workouts—preying on fitness goals one rep at a time.",
    creator: "@The_Fithunter",
    images: ["/mike.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${outfit.className} bg-[#4a4a4a] antialiased`}> {/* Updated bg to light fitness theme */}
        {/* <Analytics/> */}
        <header>
          <h1 className="sr-only">Fit Hunter | Personal Trainer Watamu Kenya</h1>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}