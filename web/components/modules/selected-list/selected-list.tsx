'use client';

import { ItemList } from '@/components/modules/item-list/item-list';
import { ITEM_TYPE } from '@/constants/items';
import { useSelectItems } from '@/hooks/useSelectItems';

export const SelectedList = () => {
  const { sortedItems } = useSelectItems();

  return (
    <div className="grid flex-1/2 grid-cols-2 gap-x-2">
      <div className="border-2 border-gray-300">
        <h2 className="bg-gray-200 p-2 text-center text-xl font-semibold">
          Fruit
        </h2>
        <div className="p-2">
          <ItemList type={ITEM_TYPE.Fruit} items={sortedItems} />
        </div>
      </div>

      <div className="border-2 border-gray-300">
        <h2 className="bg-gray-200 p-2 text-center text-xl font-semibold">
          Vegetable
        </h2>
        <div className="p-2">
          <ItemList type={ITEM_TYPE.Vegetable} items={sortedItems} />
        </div>
      </div>
    </div>
  );
};
