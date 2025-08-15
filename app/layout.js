import "./globals.css";

export const metadata = {
  title: "Sunset Tracker - Find the next sunsets in real time",
  description: "Discover breathtaking sunsets happening around the world in real time. Track golden hours and never miss a magical moment.",
  keywords: "sunset, golden hour, photography, travel, real-time tracking",
  authors: [{ name: "Hélio Sales Jr" }],
  creator: "Hélio Sales Jr",
  openGraph: {
    title: "Sunset Tracker - Live Golden Hour Alerts",
    description: "Discover breathtaking sunsets happening around the world in real time.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunset Tracker - Live Golden Hour Alerts",
    description: "Discover breathtaking sunsets happening around the world in real time.",
  },
  icons: {
    icon: '/favicon.ico',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}