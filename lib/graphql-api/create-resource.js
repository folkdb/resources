export const createResource = {
  name: 'createResource',
  operation: `
    mutation ($input: ResourceInput!) {
      createResource(data: $input) {
        _id
        slug
      }
    }
  `,
  variables: ['input'],
};
