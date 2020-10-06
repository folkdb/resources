import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import graphqlRequest from 'graphql-request';
import { mockServer } from './mock-server/index.js';
import { categories, resources } from './mock-server/data.js';
import * as api from '../lib/graphql-api/index.js';

let client;

const graphqlApiTests = suite('GraphQL API Tests');

graphqlApiTests.before(async () => {
  const { GraphQLClient } = graphqlRequest;
  const gqlServer = await mockServer();
  const { url } = await gqlServer.listen();

  client = new GraphQLClient(url);
});

graphqlApiTests('Always passes', () => {
  assert.ok(true);
});

graphqlApiTests('allCategories', async () => {
  const response = await client.request(api.allCategories.operation);

  assert.equal(
    response.allCategories.data,
    categories.map(({ _id, slug }) => ({ _id, slug })),
  );
});

graphqlApiTests('allResources', async () => {
  const response = await client.request(api.allResources.operation);

  assert.equal(
    response.allResources.data,
    resources,
  );
});

export default graphqlApiTests;
