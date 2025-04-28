'use client';

import { use, useCallback, useEffect, useMemo, useRef } from 'react';

import { SelectItemContext } from '@/components/provider';
import { ItemInterface } from '@/constants/items';

export const useSelectItems = () => {
  const { items: itemState, setItems } = use(SelectItemContext);
  const timers = useRef<Record<ItemInterface['id'], NodeJS.Timeout>>({});

  const handleMutateItem = useCallback(
    (item: ItemInterface, action: 'ADD' | 'REMOVE') => {
      setItems((prev) => {
        const next = new Map(prev);
        if (action === 'ADD') {
          next.set(item.id, item);
        } else {
          next.delete(item.id);
        }
        return next;
      });
    },
    [setItems],
  );

  const handleSelectItem = useCallback(
    (item: ItemInterface) => {
      // case: already added - remove
      if (itemState.has(item.id)) {
        handleMutateItem(item, 'REMOVE');
        return;
      }

      // case: not added yet - add
      handleMutateItem(item, 'ADD');

      // after a period of time, remove the element from the array
      timers.current[item.id] = setTimeout(() => {
        setItems((prev) => {
          const next = new Map(prev);
          next.delete(item.id);
          return next;
        });
      }, 5000);
    },
    [handleMutateItem, itemState, setItems],
  );

  // clear all pending timeouts on unmount
  useEffect(() => {
    const timerRef = timers.current;
    return () => {
      Object.values(timerRef).forEach(clearTimeout);
    };
  }, []);

  const sortedItems = useMemo(() => [...itemState.values()], [itemState]);

  return {
    itemState,
    sortedItems,
    handleSelectItem,
  };
};
