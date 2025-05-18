import React from 'react';
import { cn } from '@/src/lib/utils';

type Props = {
  params: {
    id: string;
  };
};

const ProductId = ({ params }: Props) => {
  return (
    <div className={cn('')}>
      <p>Продукт {params.id}</p>
    </div>
  );
};

export default ProductId;
