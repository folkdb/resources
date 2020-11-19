import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import graphqlRequest from 'graphql-request';
import { mockServer } from './mock-server/index.js';
import { categories, resources } from './mock-server/data.js';
import * as api from '../lib/graphql-api/index.js';

const graphqlApiTests = suite('GraphQL API Tests');

graphqlApiTests.before(async (context) => {
  const { GraphQLClient } = graphqlRequest;
  const gqlServer = await mockServer();
  const { url } = await gqlServer.listen();

  context.client = new GraphQLClient(url);
});

graphqlApiTests('Always passes', () => {
  assert.ok(true);
});

graphqlApiTests('allCategories', async (context) => {
  const { client } = context;
  const response = await client.request(api.allCategories.operation);

  assert.equal(
    response.allCategories.data,
    categories,
  );
});

graphqlApiTests('allResources', async (context) => {
  const { client } = context;
  const response = await client.request(api.allResources.operation);

  assert.equal(
    response.allResources.data,
    resources,
  );
});

graphqlApiTests('createCategory', async (context) => {
  const { client } = context;
  const newCategory = {
    slug: 'poultry',
    title: 'Poultry',
    group: 'meats',
  };

  const response = await client.request(
    api.createCategory.operation,
    { input: newCategory },
  );

  assert.equal(
    (({ _id, ...rest }) => rest)(response.createCategory),
    newCategory,
  );
});

graphqlApiTests('createResource', async (context) => {
  const { client } = context;
  const newResource = {
    slug: 'pear',
    url: 'http://fruit.yum/pear',
    title: 'Pear',
    author: 'Daniel',
    description: 'Another delicious tree fruit',
    category: { 
      connect: categories[2]._id,
    },
  };

  const response = await client.request(
    api.createResource.operation,
    { input: newResource },
  );
  
  assert.equal(
    response.createResource.category._id,
    categories[2]._id,
  );

  assert.equal(
    ({ _id, category, ...rest }) => rest)(response.createResource),
    ({ category, ...rest }) => rest)(newResource),
  );
});

export default graphqlApiTests;
