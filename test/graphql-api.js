import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import graphqlRequest from 'graphql-request';
import { mockServer } from './mock-server/index.js';
import { categories, resources } from './mock-server/data.js';
import * as api from '../lib/graphql-api/index.js';

const graphqlApiTests = suite('GraphQL API Tests');

graphqlApiTests.before(async (context) => {
  const gqlServer = await mockServer();
  const { url, server } = await gqlServer.listen();
  context.server = server;
  
  const { GraphQLClient } = graphqlRequest;
  context.client = new GraphQLClient(url);
});

graphqlApiTests.after((context) => {
  const { server } = context;
  server.close();
});

graphqlApiTests('allCategories', async (context) => {
  const { client } = context;
  const response = await client.request(api.allCategories.operation);

  assert.equal(
    response.allCategories.data,
    categories.map(({ _id, slug }) => ({ _id, slug })),
  );
});

graphqlApiTests('allResources', async (context) => {
  const { client } = context;
  const response = await client.request(api.allResources.operation);

  assert.equal(
    response.allResources.data,
    resources.map(({ _id, slug }) => ({ _id, slug })),
  );
});

export default graphqlApiTests;
