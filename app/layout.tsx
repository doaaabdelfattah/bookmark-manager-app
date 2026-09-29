import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

const manropeFont = localFont({
  src: [
    {
      path: "../fonts/Manrope/static/Manrope-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Manrope/static/Manrope-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Manrope/static/Manrope-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: {
    default: "Bookmark Manager | Organize Your Bookmarks",
    template: "%s | Bookmark Manager",
  },

  description:
    "A modern bookmark manager for saving, organizing, searching, and managing your favorite websites.",

  keywords: [
    "bookmark manager",
    "bookmark organizer",
    "save bookmarks",
    "bookmark app",
    "web app",
    "Next.js",
    "React",
  ],

  metadataBase: new URL("https://bookmark-manager-app-six.vercel.app/"),

  openGraph: {
    title: "Bookmark Manager | Organize Your Bookmarks",
    description:
      "Save, organize, search, and manage your favorite websites with a modern bookmark manager.",
    url: "https://bookmark-manager-app-six.vercel.app/",
    siteName: "Bookmark Manager",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bookmark Manager",
      },
    ],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manropeFont.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                classNames: {},
              }}
            />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
