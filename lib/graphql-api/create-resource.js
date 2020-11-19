export const createResource = {
  name: 'createResource',
  operation: `
    mutation ($input: ResourceInput!) {
      createResource(data: $input) {
        _id
        slug
        url
        title
        author
        description
        category {
          _id
          slug
        }
        tags {
          _id
          slug
        }
      }
    }
  `,
  variables: ['input'],
};
