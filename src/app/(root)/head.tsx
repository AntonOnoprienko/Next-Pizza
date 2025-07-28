const criticalCss = `.sticky,header{position:sticky}body,html{margin:0;font-family:var(--font-nunito),sans-serif;background:hsl(var(--background));color:hsl(var(--foreground));scroll-behavior:smooth}.bg-white,header{background-color:#fff}.container{max-width:1280px;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}@media (min-width:640px){.container{padding-left:2rem;padding-right:2rem}}header{border-bottom-width:1px;top:0;z-index:50}.mx-10{margin-left:2.5rem;margin-right:2.5rem}.py-8{padding-top:2rem;padding-bottom:2rem}.gap-3{gap:.75rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-2xl{font-size:1.5rem;line-height:2rem}.font-black{font-weight:900}.uppercase{text-transform:uppercase}.leading-4{line-height:1rem}.leading-5{line-height:1.25rem}.w-12{width:3rem}.h-12{height:3rem}.text-\[16px\]{font-size:16px}.text-\[22px\]{font-size:22px}.text-\[32px\]{font-size:32px}.text-\[40px\]{font-size:40px}.text-\[48px\]{font-size:48px}.top-0{top:0}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.shadow-lg{box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)}.shadow-black\/5{box-shadow:0 10px 15px -3px rgba(0,0,0,.05),0 4px 6px -4px rgba(0,0,0,.05)}.z-10{z-index:10}.gap-1{gap:.25rem}.p-1{padding:.25rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.rounded-2xl{border-radius:1rem}.bg-gray-50{background-color:#f9fafb}.h-11{height:2.75rem}.h-\[52px\]{height:52px}.cursor-pointer{cursor:pointer}.shadow-md{box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1)}.shadow-gray-200{box-shadow:0 1px 3px 0 rgba(229,231,235,.5)}.font-extrabold{font-weight:800}.mb-5{margin-bottom:1.25rem}.divide-y>:not([hidden])~:not([hidden]){border-top-width:1px}.divide-gray-200>:not([hidden])~:not([hidden]){border-color:#e5e7eb}.grid{display:grid}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@media (min-width:768px){.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\:gap-6{gap:1.5rem}}@media (min-width:1024px){.container{padding-left:3rem;padding-right:3rem}.lg\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\:gap-\[30px\]{gap:30px}}.items-stretch{align-items:stretch}.flex{display:flex}.flex-col{flex-direction:column}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.gap-2{gap:.5rem}.gap-4{gap:1rem}.py-4{padding-top:1rem;padding-bottom:1rem}.pt-1{padding-top:.25rem}.pt-4{padding-top:1rem}.mt-auto{margin-top:auto}.mb-1{margin-bottom:.25rem}.mt-3{margin-top:.75rem}.h-full{height:100%}.w-\[130px\]{width:130px}.w-\[256px\]{width:256px}.p-3{padding:.75rem}.p-4{padding:1rem}.text-xs{font-size:.75rem}.text-\[18px\]{font-size:18px;line-height:18px}.text-\[20px\]{font-size:20px}.font-bold{font-weight:700}.font-semibold{font-weight:600}.text-gray-600{color:#4b5563}.rounded-lg{border-radius:.5rem}.transition-transform{transition-property:transform}.duration-300{transition-duration:.3s}.ease-in-out{transition-timing-function:cubic-bezier(0.4,0,0.2,1)}.group-hover\:translate-y-2:hover{transform:translateY(.5rem)}.justify-between{justify-content:space-between}.w-\[125px\]{width:125px}.h-8{height:2rem}.mr-1{margin-right:.25rem}.inline-flex{display:inline-flex}.items-center{align-items:center}.justify-center{justify-content:center}.whitespace-nowrap{white-space:nowrap}.active\:translate-y-\[1px\]:active{transform:translateY(1px)}.text-sm{font-size:.875rem}.font-medium{font-weight:500}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-duration:150ms}.focus-visible\:outline-none:focus-visible{outline:0}.focus-visible\:ring-2:focus-visible{box-shadow:0 0 0 2px var(--ring-color)}.disabled\:pointer-events-none:disabled{pointer-events:none}.disabled\:opacity-50:disabled{opacity:.5}.bg-secondary{background-color:hsl(var(--secondary))}.text-primary{color:hsl(var(--primary))}.hover\:bg-secondary\/50:hover{background-color:rgba()}.h-10{height:2.5rem}.px-4{padding-left:1rem;padding-right:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.h-9{height:2.25rem}.rounded-md{border-radius:.375rem}.px-3{padding-left:.75rem;padding-right:.75rem}`;
export default function Head() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
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
