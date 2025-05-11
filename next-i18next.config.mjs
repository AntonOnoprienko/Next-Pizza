/** @type {import('next-i18next').UserConfig} */
export const languages = ['en', 'uk', 'ru'];
const nextI18NextConfig = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'uk', 'ru'],
      localeDetection: false,
    },
  };
  
  export default nextI18NextConfig;
  