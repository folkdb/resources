import { readFile } from 'fs/promises';
import apolloServer from 'apollo-server';
import { absolute } from '../../lib/utils/path/index.js';
import { categories, resources } from './data.js';

const { ApolloServer } = apolloServer;

export const mockServer = async () => {
  const typeDefs = await readFile(absolute('schema/generated.gql'), 'utf8');

  const resolvers = {
    Query: {
      allCategories: () => ({ 
        data: categories,
      }),
    },
  };

  return new ApolloServer({ typeDefs, resolvers });
};
