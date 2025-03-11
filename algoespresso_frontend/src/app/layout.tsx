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
  title: "AlgoEspresso",
  description: "Best place to learn DSA",
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
