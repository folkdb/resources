import runQuery from './run-query.js';

const createCategory = () => runQuery(`
  mutation {
    createCategory(data: {
       slug: "banana"
    }) {
      _id
      slug
    }
  }
`);

export default createCategory;
