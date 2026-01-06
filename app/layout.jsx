import Footer from "../components/Footer";
import Header from "../components/Header";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import AuthProvider from "./context/AuthContext";
import { Poppins } from 'next/font/google'
import StructuredData from "../components/StructuredData"; // ← Add this

const openSans = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-open-sans',
})

export const metadata = {
   metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://coinplus.co.in'
  ),
  title: 'Coinplus - Online Chit Funds Platform | Secure & Transparent',
  description: 'Join Coinplus for secure online chit funds. Get transparent chit plans, digital auctions, and financial empowerment. Start your chit fund journey today!',
  keywords: 'coinplus, chit, chits, online chit, online chits, chit fund, chit funds, digital chit, chit scheme, money saving, savings plan, financial planning, investment, online auction, chit company, monthly savings, chit group',
  
  openGraph: {
    title: 'Coinplus - Online Chit Funds Platform | Secure & Transparent',
    description: 'Join Coinplus for secure online chit funds. Get transparent chit plans, digital auctions, and financial empowerment.',
    url: 'https://coinplus.co.in',
    siteName: 'Coinplus',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Coinplus - Online Chit Funds Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Coinplus - Online Chit Funds Platform',
    description: 'Secure and transparent online chit funds for financial empowerment',
    images: ['/images/twitter-image.png'],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: [
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
      {
        url: '/images/favicon-32x32.png',
        sizes: 'any',
      },
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
    <html lang="en" className={openSans.className}>
      <head>
        <StructuredData /> 
      </head>
      <body className="bg-white text-slate-800">
        <AuthProvider>
          <Header/>
          {children}
          <Footer/>
          <GoogleAnalytics gaId="G-0EJQG62GQB" />
        </AuthProvider>
      </body>
    </html>
  )
}