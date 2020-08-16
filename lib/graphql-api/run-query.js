import graphqlRequest from 'graphql-request';

const { GraphQLClient } = graphqlRequest;

export const runQuery = async (query, variables) => {
  if (!process.env.FAUNADB_SERVER_SECRET) {
    throw new Error([
      'Failed to access FAUNADB_SERVER_SECRET from your local .env file.',
      'Check that the file exists and that this key is configured.',
    ].join(' '));
    process.exit(1);
  }
  
  const endpoint = 'https://graphql.fauna.com/graphql';
  const authorization = `Bearer ${process.env.FAUNADB_SERVER_SECRET}`;

  const graphQLClient = new GraphQLClient(endpoint, { 
    headers: { authorization },
  });

  let response;

  try {
    response = await graphQLClient.request(query, variables);
  } catch (error) {
    response = error;
  }
  
  return response;
};
