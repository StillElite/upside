import { Product } from '../types/products';

export const products: Product[] = [
  {
    id: 1,
    name: 'Pound Cake',
    sellPrice: 38,
    ingredients: [
      {
        id: 1,
        name: 'Flour',
        quantity: 3,
        unit: 'cups',
        cost: 1.09,
      },
      {
        id: 2,
        name: 'Eggs',
        quantity: 6,
        unit: 'each',
        cost: 1.8,
      },
      {
        id: 3,
        name: 'Butter',
        quantity: 1,
        unit: 'cup',
        cost: 1.2,
      },
      {
        id: 4,
        name: 'Sugar',
        quantity: 1,
        unit: 'cup',
        cost: 0.85,
      },
    ],
  },
  {
    id: 2,
    name: 'Chocolate Chip Cookies',
    sellPrice: 22,
    ingredients: [
      {
        id: 1,
        name: 'Flour',
        quantity: 2.5,
        unit: 'cups',
        cost: 0.9,
      },
      {
        id: 3,
        name: 'Butter',
        quantity: 0.75,
        unit: 'cup',
        cost: 0.9,
      },
      {
        id: 5,
        name: 'Chocolate Chips',
        quantity: 1,
        unit: 'cup',
        cost: 2.25,
      },
    ],
  },
  {
    id: 3,
    name: 'Lemon Bars',
    sellPrice: 28,
    ingredients: [
      {
        id: 3,
        name: 'Butter',
        quantity: 0.5,
        unit: 'cup',
        cost: 0.75,
      },
      {
        id: 4,
        name: 'Sugar',
        quantity: 2.25,
        unit: 'cups',
        cost: 1.9,
      },
      {
        id: 1,
        name: 'Flour',
        quantity: 1.25,
        unit: 'cups',
        cost: 0.45,
      },
      {
        id: 2,
        name: 'Eggs',
        quantity: 4,
        unit: 'each',
        cost: 1.2,
      },
      {
        id: 6,
        name: 'Lemon Juice',
        quantity: 0.66,
        unit: 'cup',
        cost: 1.1,
      },
      {
        id: 7,
        name: 'Salt',
        quantity: 0.25,
        unit: 'tsp',
        cost: 0.02,
      },
    ],
  },
];
