export const deleteResource = {
  name: 'deleteResource',
  operation: `
    mutation ($id: ID!) {
      deleteResource(id: $id) {
        _id
        slug
      }
    }
  `,
  variables: ['id'],
};
  