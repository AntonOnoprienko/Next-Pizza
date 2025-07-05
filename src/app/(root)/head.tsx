export default function Head() {
  return (
    <>
      <link rel="canonical" href="https://next-pizza.up.railway.app/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Next Pizza',
            image: 'https://next-pizza.up.railway.app/og-image.webp',
            url: 'https://next-pizza.up.railway.app',
            logo: 'https://next-pizza.up.railway.app/og-image.wepb',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Харьков',
              addressCountry: 'UA',
            },
          }),
        }}
      />
    </>
  );
}
