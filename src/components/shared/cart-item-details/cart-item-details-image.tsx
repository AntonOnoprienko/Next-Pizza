import { cn } from '@/src/lib/utils';
import dynamic from 'next/dynamic';

interface Props {
    src: string;
    name: string
    className?: string;
}
const CldImage = dynamic(() => import('next-cloudinary').then(mod => mod.CldImage), { ssr: false });
export const CartItemDetailsImage: React.FC<Props> = ({ src, name, className }) => {
    return <CldImage
        src={src}
        alt={name}
        width={60}
        height={60}
        crop="fill"
        quality="auto"
        format="auto"
        priority
        className={cn('w-[60px] h-[60px]', className)}
    />
};