import runQuery from './run-query.js';

export const allCategories = () => runQuery(`
  {
    allCategories {
      data {
        _id
        slug
      }
    }
  }
`);
