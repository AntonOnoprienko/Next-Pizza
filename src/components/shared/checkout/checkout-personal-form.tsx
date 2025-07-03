import { FormInput, FormInputPhone, WhiteBlock } from '..';

interface Props {
  className?: string;
}
export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
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
