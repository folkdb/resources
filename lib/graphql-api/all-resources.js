export const allResources = {
  name: 'allResources',
  operation: `
    {
      allResources {
        data {
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
            data {
              _id
              slug
            }
          }
        }
      }
    }
  `,
  variables: [],
};
