import { resolve } from 'path';
import { readFile } from 'fs/promises';
import apolloServer from 'apollo-server';
import { uid } from 'uid';
import { categories, resources } from './data.js';

const { ApolloServer } = apolloServer;

export const mockServer = async () => {
  const typeDefs = await readFile(
    resolve(process.cwd(), 'schema/generated.gql'),
    'utf8',
  );

  const resolvers = {
    Query: {
      allCategories: () => ({ data: categories }),
      allResources: () => ({ data: resources }),
    },
    Mutation: {
      createCategory: (_, { data }) => ({ _id: uid(), ...data }),
      createResource: (_, { data }) => {
        let connected = categories.find(
          ({ _id }) => _id === data.category.connect,
        );
        if (!connected) { connected = data.category.create; }
        return {
          _id: uid(),
          ...data,
          category: { _id: connected._id, slug: connected.slug },
          tags: { data: [] },
        };
      },
      deleteCategory: (_, { id }) => ({ 
        _id: id,
        slug: categories.find(({ _id }) => _id === id).slug,
      }),
      deleteResource: (_, { id }) => ({ 
        _id: id,
        slug: resources.find(({ _id }) => _id === id).slug,
      }),
      updateCategory: (_, { id, data }) => ({
        ...categories.find(({ _id }) => _id === id),
        ...data,
      }),
      updateResource: (_, { id, data }) => ({
        ...resources.find(({ _id }) => _id === id),
        ...data,
      }),
    },
  };

  return new ApolloServer({ typeDefs, resolvers });
};
