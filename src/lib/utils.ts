import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const CLOUDINARY_BASE_URL =
  'https://res.cloudinary.com/dkvao65cp/image/upload';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCloudinaryUrl(publicId: string) {
  return `${CLOUDINARY_BASE_URL}${publicId}`;
}
