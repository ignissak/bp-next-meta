import { HomepageNavBar } from "@/components/homepage/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["latin"],
  adjustFontFallback: false,
  fallback: ["apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Learn AI",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="min-h-screen">
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <HomepageNavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
