export const createCategory = `
  mutation ($slug: String!) {
    createCategory(data: {
      slug: $slug
    }) {
      _id
      slug
    }
  }
`;
