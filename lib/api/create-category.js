import runQuery from './run-query.js';

const createCategory = ({ slug }) => runQuery(`
  mutation {
    createCategory(data: {
       slug: $slug
    }) {
      _id
      slug
    }
  }
`, { slug });

export default createCategory;
