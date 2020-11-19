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
    category: { 
      _id: categories[0]._id,
      slug: categories[0].slug,
    },
    tags: { data: [] },
  },
  {
    _id: 'r2',
    slug: 'carrot',
    url: 'http://veggies.yum/carrot',
    title: 'Carrot',
    author: 'Daniel',
    description: 'A delicious root vegetable',
    category: { 
      _id: categories[1]._id,
      slug: categories[1].slug,
    },
    tags: { data: [] },
  },
  {
    _id: 'r1',
    slug: 'oats',
    url: 'http://grains.yum/oats',
    title: 'Oats',
    author: 'Daniel',
    description: 'A delicious whole grain',
    category: { 
      _id: categories[2]._id,
      slug: categories[2].slug,
    },
    tags: { data: [] },
  },
];
