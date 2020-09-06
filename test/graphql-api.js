import graphqlRequest from 'graphql-request';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { gqlServer } from './gql-server/index.js';

const { GraphQLClient } = graphqlRequest;

test('Gets expected Hello response', async () => {
  const httpServer = await gqlServer.listen();
  const client = new GraphQLClient(httpServer.url);

  const response = await client.request(`
    {
      hello(name: "Daniel")
    }
  `);
  
  assert.equal(response.hello, 'Hello Daniel');

  httpServer.server.close();
});

export default test;
