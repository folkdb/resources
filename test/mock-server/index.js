import { resolve } from 'path';
import { readFile } from 'fs/promises';
import apolloServer from 'apollo-server';
import { categories, resources } from './data.js';
import { All, Create, Delete, Update } from './operations.js';

const { ApolloServer } = apolloServer;

export const mockServer = async () => {
  const typeDefs = await readFile(
    resolve(process.cwd(), 'schema/generated.gql'),
    'utf8',
  );

  const resolvers = {
    Query: {
      allCategories: () => All(categories),
      allResources: () => All(resources),
      createCategory: Create(categories),
      createResource: Create(resources),
      deleteCategory: Delete(categories),
      deleteResource: Delete(resources),
      updateCategory: Update(categories),
      updateResource: Update(resources),
    },
  };

  return new ApolloServer({ typeDefs, resolvers });
};
