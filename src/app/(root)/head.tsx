export default function Head() {
  return (
    <>
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
