export const ITEM_TYPE = {
  Fruit: 'Fruit',
  Vegetable: 'Vegetable',
} as const;

export type ITEM_TYPE = (typeof ITEM_TYPE)[keyof typeof ITEM_TYPE];

export type ItemInterface = {
  id: number;
  value: string;
  type: ITEM_TYPE;
};

export const mockList = [
  {
    id: 1,
    value: 'Apple',
    type: ITEM_TYPE.Fruit,
  },

  {
    id: 2,
    value: 'Broccoli',
    type: ITEM_TYPE.Vegetable,
  },
  {
    id: 3,
    value: 'Mushroom',
    type: ITEM_TYPE.Vegetable,
  },
  {
    id: 4,
    value: 'Banana',
    type: ITEM_TYPE.Fruit,
  },
  {
    id: 5,
    value: 'Tomato',
    type: ITEM_TYPE.Vegetable,
  },
  {
    id: 6,
    value: 'Orange',
    type: ITEM_TYPE.Fruit,
  },
  {
    id: 7,
    value: 'Mango',
    type: ITEM_TYPE.Fruit,
  },
  {
    id: 8,
    value: 'Pineapple',
    type: ITEM_TYPE.Fruit,
  },
  {
    id: 9,
    value: 'Cucumber',
    type: ITEM_TYPE.Vegetable,
  },
  {
    id: 10,
    value: 'Watermelon',
    type: ITEM_TYPE.Fruit,
  },
  {
    id: 11,
    value: 'Carrot',
    type: ITEM_TYPE.Vegetable,
  },
] as const as ItemInterface[];
