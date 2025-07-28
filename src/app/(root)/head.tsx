export default function Head() {
  return (
    <>
      <link rel="stylesheet" href="/critical.min.css" />
      <link rel="canonical" href="https://next-pizza.up.railway.app/" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Next Pizza',
            image: 'https://next-pizza.up.railway.app/og-image.webp',
            url: 'https://next-pizza.up.railway.app',
            logo: 'https://next-pizza.up.railway.app/og-image.webp',
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
