import runQuery from './run-query.js';

export const deleteCategoryBySlug = ({ slug }) => runQuery(`
  mutation ($slug: String!) {
    deleteCategoryBySlug(data: {
      slug: $slug
    }) {
      _id
      slug
    }
  }
`, { slug });
