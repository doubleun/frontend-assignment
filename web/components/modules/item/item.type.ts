import { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { ItemInterface } from '@/constants/items';

export interface ItemProps extends ComponentProps<typeof Button> {
  item: ItemInterface;
}
