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
  title: {
    default: 'Coinplus - India\'s Most Trusted Online Chit Fund Platform',
    template: '%s | Coinplus Chit Funds'
  },
  description: 'Coinplus offers secure and transparent online chit funds with digital auctions, instant withdrawals, and highest returns. Join 10,000+ happy subscribers across India. Register for free!',
  keywords: 'coinplus chit fund, online chit funds India, best chit fund company, chit fund schemes, monthly saving plans, chit fund online registration, digital chit fund platform, chit fund benefits, chit fund calculator, chit fund auction, chit fund interest, chit fund maturity, chit fund dividend, chit fund comparison, chit fund vs FD, chit fund vs RD, chit fund for women, chit fund for business, Ksfe alternative, chit fund company Kerala, chit fund company India, safe chit fund, government registered chit fund, chit fund returns, chit fund tax benefits, chit fund in Kerala, chit fund in Tamil Nadu, chit fund in Karnataka, chit fund in Bangalore, chit fund in Chennai, chit fund in Kochi',
  
  authors: [{ name: 'Coinplus Team' }],
  creator: 'Coinplus',
  publisher: 'Coinplus Financial Services',
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  openGraph: {
    title: 'Coinplus - Transform Your Savings with Digital Chit Funds',
    description: 'Experience the future of chit funds with Coinplus. Digital auctions, transparent process, and better returns. Start your savings journey today!',
    url: 'https://coinplus.co.in',
    siteName: 'Coinplus Chit Funds',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Coinplus - Online Chit Fund Platform',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Coinplus - Online Chit Funds Made Simple',
    description: 'Join India\'s fastest growing chit fund platform. Digital, transparent, and secure.',
    images: ['/images/twitter-image.png'],
    creator: '@coinplus',
    site: '@coinplus',
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      maxVideoPreview: -1,
      maxImagePreview: 'large',
      maxSnippet: -1,
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
  
  manifest: '/manifest.json',
  
  verification: {
    google: 'your-google-site-verification-code', // Add your actual verification code
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  
  category: 'finance',
  
  alternates: {
    canonical: 'https://coinplus.co.in',
    // languages: {
    //   'en-IN': 'https://coinplus.co.in',
    //   'ml-IN': 'https://coinplus.co.in/ml',
    //   'ta-IN': 'https://coinplus.co.in/ta',
    // },
  },
}

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