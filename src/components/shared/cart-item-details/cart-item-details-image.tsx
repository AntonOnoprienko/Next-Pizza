import { cn } from '@/src/lib/utils';
import { DynamicCldImage } from '../../dynamics';

interface Props {
    src: string;
    name: string
    className?: string;
}
export const CartItemDetailsImage: React.FC<Props> = ({ src, name, className }) => {
    return  <DynamicCldImage
        src={src}
        alt={name}
        width={60}
        height={60}
        quality="auto"
        format="auto"
        priority
        className={cn('w-[60px] h-[60px]', className)}
        fallbackImage
    />
};