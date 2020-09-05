export const deleteCategory = {
  name: 'deleteCategory',
  operation: `
    mutation ($id: ID!) {
      deleteCategory(id: $id) {
        _id
        slug
      }
    }
  `,
  variables: ['id'],
};
