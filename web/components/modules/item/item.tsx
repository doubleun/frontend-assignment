import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { ItemProps } from './item.type';

export const Item = ({ item, className, ...rest }: ItemProps) => {
  return (
    <Button
      key={item.id}
      variant={'outline'}
      className={cn('rounded-none p-6 text-lg', className)}
      {...rest}
    >
      {item.value}
    </Button>
  );
};
