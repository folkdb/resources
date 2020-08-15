import runQuery from './run-query.js';

const createCategory = ({ slug }) => runQuery(`
  mutation CreateCategory($slug: String!) {
    createCategory(data: {
       slug: $slug
    }) {
      _id
      slug
    }
  }
`, { slug });

export default createCategory;
