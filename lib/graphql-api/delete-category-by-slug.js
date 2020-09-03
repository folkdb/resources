export const deleteCategoryBySlug = `
  mutation ($slug: String!) {
    deleteCategoryBySlug(data: {
      slug: $slug
    }) {
      _id
      slug
    }
  }
`;
