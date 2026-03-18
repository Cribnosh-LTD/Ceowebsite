import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://doyleomachonu.co.uk"),
  title: {
    default: "Doyle Omachonu | Cribnosh",
    template: "%s | Doyle Omachonu",
  },
  description: "Doyle Omachonu, CEO of Cribnosh. Working to support the economy of food creators in the UK.",
  keywords: ["Doyle Omachonu", "Cribnosh", "FoodTech UK", "Food creators", "UK food landscape", "Strategic Project Management", "Entrepreneurship"],
  authors: [{ name: "Doyle Omachonu" }],
  creator: "Doyle Omachonu",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://doyleomachonu.co.uk", // Assuming domain, user can update
    title: "Doyle Omachonu | Cribnosh",
    description: "Working to support the economy of food creators in the UK.",
    siteName: "Doyle Omachonu",
    images: [
      {
        url: "/doyle-omachonu.png",
        width: 1200,
        height: 630,
        alt: "Doyle Omachonu - Cribnosh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doyle Omachonu | Cribnosh",
    description: "Working to support the economy of food creators in the UK.",
    images: ["/doyle-omachonu.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Doyle Omachonu",
    "jobTitle": "CEO & Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Cribnosh"
    },
    "description": "CEO of Cribnosh, FoodTech visionary empowering the hidden economy of food creators.",
    "url": "https://doyleomachonu.co.uk",
    "sameAs": [
      "https://www.linkedin.com/in/doyle-omachonu-9907981a0/"
    ],
    "image": "https://doyleomachonu.co.uk/doyle-omachonu.png"
  };

  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${oswald.variable} ${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
