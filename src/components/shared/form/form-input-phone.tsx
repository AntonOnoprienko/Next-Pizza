'use client';

import React from 'react';
import InputMask from 'react-input-mask';
import { Controller, useFormContext } from 'react-hook-form';
import { ClearButton, ErrorText, RequiredSymbol } from '..';
import { Input } from '../../ui';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInputPhone: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Controller
          name={name}
          control={control}
          rules={{ required: required ? 'Поле обязательно' : false }}
          render={({ field }) => (
            <InputMask mask="+38 (099) 999-99-99" {...field}>
              {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                <Input {...inputProps} {...props} className="h-12 text-md" />
              )}
            </InputMask>
          )}
        />
        {value && <ClearButton onClick={onClickClear} />}
      </div>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
