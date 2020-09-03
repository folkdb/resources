export const deleteCategoryBySlug = {
  name: 'deleteCategoryBySlug',
  operation: `
    mutation ($slug: String!) {
      deleteCategoryBySlug(data: {
        slug: $slug
      }) {
        _id
        slug
      }
    }
  `,
  variables: ['slug'],
};
