export const categories = [
  {
    _id: 'c1',
    slug: 'fruits',
    title: 'Fruits',
    group: 'produce',
  },
  {
    _id: 'c2',
    slug: 'vegetables',
    title: 'Vegetables',
    group: 'produce',
  },
  {
    _id: 'c3',
    slug: 'grains',
    title: 'Grains',
    group: null,
  },
];

export const resources = [
  {
    _id: 'r1',
    slug: 'apple',
    url: 'http://fruit.yum/apple',
    title: 'Apple',
    author: 'Daniel',
    description: 'A delicious tree fruit',
    category: categories[0],
  },
  {
    _id: 'r2',
    slug: 'carrot',
    url: 'http://veggies.yum/carrot',
    title: 'Carrot',
    author: 'Daniel',
    description: 'A delicious root vegetable',
    category: categories[1],
  },
  {
    _id: 'r1',
    slug: 'oats',
    url: 'http://grains.yum/oats',
    title: 'Oats',
    author: 'Daniel',
    description: 'A delicious whole grain',
    category: categories[2],
  },
];
