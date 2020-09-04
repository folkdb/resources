import { expect } from '../utils/type/index.js';
import { relative } from '../utils/path/index.js';
import { iter } from '../utils/fp/index.js';
import { tryCatch } from '../utils/async/index.js';
import { allCategories } from '../graphql-api/index.js';

export const mapCategories = (clientApi) => {
  const source = relative(import.meta.url);
  const call = 'mapCategories(clientApi)';

  expect('Function')(clientApi, { source, call, argument: 'clientApi' });

  return tryCatch(
    async () => {
      const response = await clientApi(allCategories);
      const { data } = response.allCategories;
      const categoryMap = new Map();
  
      iter(({ slug, ...rest }) => {
        categoryMap.set(slug, { ...rest });
      })(data);
      
      return categoryMap;
    },
    {
      source,
      call,
      arguments: { clientApi: '[Function]' },
    },
  );
};
