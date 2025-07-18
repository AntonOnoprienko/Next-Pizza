'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { DynamicNotificationToast } from '../dynamics';

interface VerifiedToastProps {
  toastValue?: string;
  className?: string;
}

export function VerifiedToast({ toastValue, className }: VerifiedToastProps) {
  useEffect(() => {
    if (toastValue === 'verified_success') {
      toast.custom(
        () => (
          <DynamicNotificationToast
            notification="Почта успешно подтверждена!"
            isLoading={false}
            success={true}
            className={className}
          />
        ),
        {
          id: 'verified_success_toast',
          duration: 4000,
          position: 'top-center',
        },
      );
      Cookies.remove('toast');
    }
  }, [className, toastValue]);

  return null;
}
