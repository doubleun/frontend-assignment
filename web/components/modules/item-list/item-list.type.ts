import { ITEM_TYPE, ItemInterface } from '@/constants/items';

export interface ItemListProps {
  items: ItemInterface[];
  type?: ITEM_TYPE | 'ALL';
}
