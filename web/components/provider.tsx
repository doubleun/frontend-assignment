'use client';

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from 'react';

import { ItemInterface } from '@/constants/items';

type SelectItemMapType = Map<ItemInterface['id'], ItemInterface>;
export type SelectItemContextType = {
  items: SelectItemMapType;
  setItems: Dispatch<SetStateAction<SelectItemMapType>>;
};

const initialItems = new Map<ItemInterface['id'], ItemInterface>();

export const SelectItemContext = createContext<SelectItemContextType>({
  items: initialItems,
  setItems: () => {},
});

export function Providers({ children }: PropsWithChildren) {
  // or uses state manager like zustand
  const [items, setItems] = useState<SelectItemMapType>(initialItems);

  return (
    <SelectItemContext.Provider value={{ items, setItems }}>
      {children}
    </SelectItemContext.Provider>
  );
}
