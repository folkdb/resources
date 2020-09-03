import graphqlRequest from 'graphql-request';
import { expect, expectOneOf } from '../utils/type/index.js';
import { relative } from '../utils/path/index.js';
import { tryCatch } from '../utils/async/index.js';

const { GraphQLClient } = graphqlRequest;

export const gqlQuery = (endpoint, authKey) => (query, variables) => {
  const source = relative(import.meta.url);
  const call = 'gqlQuery(endpoint, authKey)(query, variables)'
  
  expect('String')(endpoint, { source, call, argument: 'endpoint' });
  expect('String')(authKey, { source, call, argument: 'authKey' });
  expect('Object')(query, { source, call, argument: 'query' });
  
  expectOneOf([
    'Object',
    'Undefined',
  ])(variables, { source, call, argument: 'variables' });

  return tryCatch(
    () => {
      if (!process.env[authKey]) {
        throw new Error(`Failed to access ${authKey} from your local .env file. Check that the file exists and that this key is configured.`);
      }
  
      const authorization = `Bearer ${process.env[authKey]}`;
    
      const graphQLClient = new GraphQLClient(endpoint, {
        headers: { authorization },
      });
    
      return graphQLClient.request(query.operation, variables);
    },
    {
      source,
      call,
      arguments: { endpoint, authKey, query: query.name, variables },
    },
  );
};
