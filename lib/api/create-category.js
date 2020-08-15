import runQuery from './run-query.js';

const createCategory = () => runQuery(`
  mutation {
    createCategory(data: {
       slug: "banana"
       resources: []
    }) {
      _id
      slug
      resources
    }
  }
`);

export default createCategory;
