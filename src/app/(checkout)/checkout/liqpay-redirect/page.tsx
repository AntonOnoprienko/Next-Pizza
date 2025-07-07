'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LiqPayRedirectPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const signature = searchParams.get('signature');

  useEffect(() => {
    if (data && signature) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.liqpay.ua/api/3/checkout';
      form.acceptCharset = 'utf-8';

      const inputData = document.createElement('input');
      inputData.type = 'hidden';
      inputData.name = 'data';
      inputData.value = data;

      const inputSig = document.createElement('input');
      inputSig.type = 'hidden';
      inputSig.name = 'signature';
      inputSig.value = signature;

      form.appendChild(inputData);
      form.appendChild(inputSig);

      document.body.appendChild(form);
      form.submit();
    }
  }, [data, signature]);

  return (
    <div style={{ textAlign: 'center', paddingTop: '80px' }}>
      <p style={{ fontSize: '18px' }}>
        ⏳ Перенаправляем на оплату через LiqPay...
      </p>
    </div>
  );
}
