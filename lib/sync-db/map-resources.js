import { expect } from '../utils/type/index.js';
import { relative } from '../utils/path/index.js';
import { iter } from '../utils/fp/index.js';
import { tryCatch } from '../utils/async/index.js';
import { allCategories } from '../graphql-api/index.js';

export const mapResources = (clientApi) => {
  const source = relative(import.meta.url);
  const call = 'mapResources(clientApi)';

  expect('Function')(clientApi, { source, call, argument: 'clientApi' });

  return tryCatch(
    async () => {
      const response = await clientApi(allResources);
      const { data } = response.allResources;
      const resourceMap = new Map();
  
      iter(({ slug, ...rest }) => {
        resourceMap.set(slug, { ...rest });
      })(data);
      
      return resourceMap;
    },
    {
      source,
      call,
      arguments: { clientApi: '[Function]' },
    },
  );
};
