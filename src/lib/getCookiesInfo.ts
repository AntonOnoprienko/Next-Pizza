import { cookies } from 'next/headers';

export const getCookiesInfo = () => {
  const cookieStore = cookies();
  const viewport = cookieStore.get('viewport')?.value ?? 'desktop';
  const toastValue = cookieStore.get('toast')?.value;

  return {
    isMobile: viewport === 'mobile',
    isDesktop: viewport === 'desktop',
    toastValue,
    viewport,
  };
};
