import React from 'react';
import { cn } from '@/src/lib/utils';
import { FormInput, WhiteBlock } from '..';
import { Textarea } from '../../ui';

type Props = {
  className?: string;
};

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput name="address" className="text-base" placeholder="Адресс" />
        <Textarea
          rows={5}
          className="text-base"
          placeholder="Комментарии к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
