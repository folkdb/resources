import runQuery from './run-query';

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
