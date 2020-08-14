import runQuery from './run-query.js';

const allCategories = () => runQuery(`
  {
    allCategories {
      data {
        _id
        slug
      }
    }
  }
`);

export default allCategories;
