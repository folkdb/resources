export const createCategory = {
  name: 'createCategory',
  operation: `
    mutation ($input: CategoryInput!) {
      createCategory(data: $input) {
        _id
        slug
      }
    }
  `,
  variables: ['input'],
};
