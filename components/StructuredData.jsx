export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Coinplus Chit Funds",
    "url": "https://coinplus.co.in",
    "logo": "https://coinplus.co.in/images/logo.png",
    "description": "Online chit fund platform offering transparent and secure chit schemes across India",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Karingachira,Tripunithura",
      "addressRegion": "kerala",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Sat 09:00-17:00",
    "sameAs": [
      "https://www.facebook.com/people/Coin-Plus",
      "https://www.instagram.com/coinplus.co.in",
      "https://www.linkedin.com/company/coinplusindia/",
      "https://x.com/Coinplusindia"
    ],
    "priceRange": "₹500 - ₹50000",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Chit Fund Schemes",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Monthly Chit Scheme",
            "description": "Save monthly and get lump sum amount through auction"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Quarterly Chit Scheme",
            "description": "Quarterly savings plan with higher returns"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "1000"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}