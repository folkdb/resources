export const updateResource = {
  name: 'updateResource',
  operation: `
    mutation ($id: ID!, $input: ResourceInput!) {
      updateResource(id: $id, data: $input) {
        _id
        slug
        url
        title
        author
        description
        category
        tags
      }
    }
  `,
  variables: ['id', 'input'],
};
