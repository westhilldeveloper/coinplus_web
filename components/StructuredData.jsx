// components/StructuredData.js
export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    'name': 'Coinplus',
    'description': 'Online chit funds platform providing secure and transparent financial services',
    'url': 'https://coinplus.co.in',
    'logo': 'https://coinplus.co.in/images/cplogo.png',
    'telephone': '+91-97460 03484',
    'email': 'care@coinplus.co.in',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'FINOVEST GROUP',
      'addressLocality': 'Kalyana Krishna Samskrithibhavan, BHS Rd, Kannankulangara, Thrippunithura, Ernakulam',
      'addressRegion': 'Kerala',
      'postalCode': '691555',
      'addressCountry': 'IN'
    },
    'serviceType': 'Chit Funds',
    'areaServed': 'India'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}