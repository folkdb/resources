export const createCategory = {
  name: 'createCategory',
  operation: `
    mutation ($slug: String!) {
      createCategory(data: {
        slug: $slug
      }) {
        _id
        slug
      }
    }
  `,
  variables: ['slug'],
};
