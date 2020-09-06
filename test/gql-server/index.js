import { readFile } from 'fs/promises';
import apolloServer from 'apollo-server';
import { absolute } from '../lib/utils/path/index.js';

const { ApolloServer } = apolloServer;

export const mockServer = async () => {
  const typeDefs = await readFile(absolute('schema/generated.gql'), 'utf8');

  const resolvers = {
    Query: {
      allResources: () => ({ 
        data: [
          { slug: 'apple' },
          { slug: 'orange' },
          { slug: 'pear' },
        ],
      }),
    },
  };

  return new ApolloServer({ typeDefs, resolvers });
};
