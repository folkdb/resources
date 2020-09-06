import graphqlRequest from 'graphql-request';

import { test } from 'uvu';
import * as assert from 'uvu/assert';
import server from './gql-server/index.js';

server.start(() => console.log('Server is running on localhost:4000'))

const { GraphQLClient } = graphqlRequest;
const client = new GraphQLClient('http://localhost:4000');

test('Gets expected Hello response', async () => {
  const response = await client.request(`
    {
      hello(name: "Daniel")
    }
  `);
  
  assert.equal(response, 'Hello Daniel');
});

server.close();
