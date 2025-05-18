import React from 'react';
import { cn } from '@/src/lib/utils';

type Props = {
  className?: string;
  params: {
    id: string;
  }  
};

const ProductId: React.FC<Props> = ({ className, params  }) => {
  return (
    <div className={cn('', className)}>
        <p>Продукт {params.id}</p>
    </div>
  );
};

export default ProductId;
