'use client';

import React, { useMemo } from 'react';

import { Item } from '@/components/modules/item/item';
import { useSelectItems } from '@/hooks/useSelectItems';

import { ItemListProps } from './item-list.type';

export const ItemList = ({ items, type }: ItemListProps) => {
  const { itemState, handleSelectItem } = useSelectItems();
  const displayItems = useMemo(() => {
    // filter the main list
    if (!type || type === 'ALL')
      return items.filter((i) => !itemState.has(i.id));

    // filter the sub list (separated type lists)
    return items.filter((i) => i.type === type);
  }, [itemState, items, type]);

  return (
    <div className="flex flex-1 flex-col gap-2">
      {displayItems.map((i) => (
        <Item key={i.id} onClick={() => handleSelectItem(i)} item={i} />
      ))}
    </div>
  );
};
