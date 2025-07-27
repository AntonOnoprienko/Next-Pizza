'use client';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { AlignJustify } from 'lucide-react';
import { LoginButton } from '../.';
import React from 'react';

export const HeaderMobileMenu: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="w-12 h-12 p-3" aria-label="Открыть меню">
          <AlignJustify className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col justify-between pb-0 bg-[#F4F1EE]"
      >
        <div className="flex flex-col space-y-4 mt-6 gap-3">
          <LoginButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};
