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

graphqlApiTests('allCategories', async () => {
  const { context } = client;
  const response = await client.request(api.allCategories.operation);

  assert.equal(
    response.allCategories.data,
    categories.map(({ _id, slug }) => ({ _id, slug })),
  );
});

graphqlApiTests('allResources', async () => {
  const { context } = client;
  const response = await client.request(api.allResources.operation);

  assert.equal(
    response.allResources.data,
    resources.map(({ category, ...rest }) => ({
      category: { _id: category._id, slug: category.slug },
      ...rest
    })),
  );
});

export default graphqlApiTests;
