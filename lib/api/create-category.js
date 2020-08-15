import { runQuery } from './run-query.js';

export const createCategory = ({ slug }) => runQuery(`
  mutation ($slug: String!) {
    createCategory(data: {
      slug: $slug
    }) {
      _id
      slug
    }
  }
`, { slug });
