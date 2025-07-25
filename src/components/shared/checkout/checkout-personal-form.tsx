import { cn } from '@/src/lib/utils';
import { FormInput, FormInputPhone, WhiteBlock } from '..';

interface Props {
  isMobile?: boolean;
  className?: string;
}
export const CheckoutPersonalForm: React.FC<Props> = ({
  isMobile,
  className,
}) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div
        className={cn(
          isMobile ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-5',
        )}
      >
        <FormInput
          name="firstName"
          className="text-base w-full"
          placeholder="Имя"
        />
        <FormInput
          name="lastName"
          className="text-base w-full"
          placeholder="Фамилия"
        />
        <FormInput
          name="email"
          className="text-base w-full"
          placeholder="E-Mail"
        />
        <FormInputPhone
          name="phone"
          className="text-base w-full"
          placeholder="Телефон"
        />
      </div>
    </WhiteBlock>
  );
};
