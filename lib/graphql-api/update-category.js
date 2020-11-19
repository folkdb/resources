export const updateCategory = {
  name: 'updateCategory',
  operation: `
    mutation ($id: ID!, $input: CategoryInput!) {
      updateCategory(id: $id, data: $input) {
        _id
        slug
        title
        group
      }
    }
  `,
  variables: ['id', 'input'],
};
