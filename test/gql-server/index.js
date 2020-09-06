import apolloServer from 'apollo-server';

const { ApolloServer } = apolloServer;

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
  },
};

export const gqlServer = new ApolloServer({ typeDefs, resolvers });
