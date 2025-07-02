import { cn } from '@/src/lib/utils';

interface Props {
  title?: React.ReactNode;
  value?: React.ReactNode;
  notification?: React.ReactNode;
  className?: string;
}
export const CheckoutItemDetails: React.FC<Props> = ({
  title,
  value,
  notification,
  className,
}) => {
  return (
    <div className={cn('flex my-4', className)}>
      <div className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </div>
      <div className="flex items-center">{notification}</div>
      <div className="font-bold text-lg">{value}</div>
    </div>
  );
};
