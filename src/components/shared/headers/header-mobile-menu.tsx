'use client';

import { Button } from '../../ui';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { Menu } from 'lucide-react';
import { CartButton, LoginButton, SearchInput } from '../.';
import React from 'react';

type Props = {
  hasCart?: boolean;
  hasSearch?: boolean;
};

export const HeaderMobileMenu: React.FC<Props> = ({ hasCart, hasSearch }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col justify-between pb-0 bg-[#F4F1EE]"
      >
        <div className="flex flex-col space-y-4 mt-6 gap-3">
          <div className="w-full">
            <SearchInput />
          </div>

          <div>
            <LoginButton />
          </div>
          <CartButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};
