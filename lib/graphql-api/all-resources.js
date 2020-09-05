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
        }
      }
    }
  `,
  variables: [],
};
