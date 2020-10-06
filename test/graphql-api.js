import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import graphqlRequest from 'graphql-request';
import { mockServer } from './mock-server/index.js';
import { categories, resources } from './mock-server/data.js';
import * as api from '../lib/graphql-api/index.js';

let client;
let cleanup;

const graphqlApiTests = suite('GraphQL API Tests', { client, cleanup });

graphqlApiTests.before(async () => {
  const gqlServer = await mockServer();
  const { url, server } = await gqlServer.listen();
  cleanup = () => { server.close(); };
  
  const { GraphQLClient } = graphqlRequest;
  client = new GraphQLClient(url);
});

graphqlApiTests.after(() => {
  cleanup();
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
    resources.map(({ _id, slug }) => ({ _id, slug })),
  );
});

export default graphqlApiTests;
