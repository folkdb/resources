export const allCategories = {
  name: 'allCategories',
  operation: `
    {
      allCategories {
        data {
          _id
          slug
          title
          group
        }
      }
    }
  `,
  variables: [],
};
