import React from 'react';
import { FormInput, FormInputAddressFull, FormTextarea, WhiteBlock } from '..';

type Props = {
  className?: string;
};

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInputAddressFull
          cityNameField="city"
          streetNameField="street"
          houseField="house"
          className="text-base"
        />
        <FormTextarea
          rows={5}
          className="text-base"
          placeholder="Комментарии к заказу"
          name={'comment'}
        />
      </div>
    </WhiteBlock>
  );
};
