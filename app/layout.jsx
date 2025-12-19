import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import AuthProvider from "./context/AuthContext";


export const metadata = {
  title: 'CoinPlus',
  description: 'Chit funds, plans, and branches — built with Next.js + Tailwind',
  icons: {
    icon: [
      // PNG format
      {
        url: '/images/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/images/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      // ICO format (for older browsers)
      {
        url: '/images/favicon-32x32.png',
        sizes: 'any',
      },
      // SVG format (modern)
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: [
      {
        url: '/images/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: ['/favicon.ico'],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-800">
        <AuthProvider>
        <Header/>
        {children}
         
         <Footer/>
         <GoogleAnalytics gaId="G-WLRGPBE180" />
         </AuthProvider>
      </body>
    </html>
  )
}
