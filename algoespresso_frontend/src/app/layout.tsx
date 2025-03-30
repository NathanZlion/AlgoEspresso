import type { Metadata } from "next";
import LocalFont from "next/font/local"
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from "@clerk/themes";


const dotGothic16 = LocalFont(
  {
    src: "./fonts/DotGothic16-Regular.ttf",
    variable: "--font-dot-gothic",
    weight: "400",
  }
)

const AzeretMono = LocalFont(
  {
    src: [
      {
        path: "./fonts/azeret_mono/AzeretMono-Regular.ttf",
        weight: "400"
      },
      {
        path: "./fonts/azeret_mono/AzeretMono-Bold.ttf",
        weight: "700"
      }
    ],
    variable: "--font-azeret-mono",
  }
)

export const metadata: Metadata = {
  title: {
    default: "AlgoEspresso",
    template: "%s | AlgoEspresso",
  },
  generator: "AlgoEspresso",
  description: "Best place to learn DSA",
  metadataBase: new URL('https://algo-espresso.vercel.app/'),
  keywords: ["DSA", "Data Structures", "Algorithms", "Programming"],
  authors: [
    {
      name: "Nathnael Dereje",
      url: "https://nathnael-dereje.vercel.app/"
    }
  ],
  creator: "Nathnael Dereje",
  openGraph: {
    title: "AlgoEspresso",
    description: "Best place to learn DSA",
    siteName: "AlgoEspresso",
    images: [
      {
        url: "/og-image.png",
        alt: "AlgoEspresso's OG :)",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
    url: "https://algo-espresso.vercel.app/",
  },
  robots: {
    index: true,
    follow: true
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} >
      <html lang="en" suppressHydrationWarning>
        <body className={`${AzeretMono.variable} ${dotGothic16.variable} antialiased bg-background`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html >
    </ClerkProvider>
  );
}
