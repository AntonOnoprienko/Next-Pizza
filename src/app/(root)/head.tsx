export default function Head() {
  return (
    <>
    <link rel="canonical" href="https://next-pizza.up.railway.app/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Next Pizza",
            "url": "https://next-pizza.up.railway.app",
            "logo": {
              "@type": "ImageObject",
              "url": "https://next-pizza.up.railway.app/og-image.png",
              "width": 112,
              "height": 112,
            },
          }),
        }}
      />
    </>
  )
}
