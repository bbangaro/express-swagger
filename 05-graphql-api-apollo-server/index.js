import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// The GraphQL schema
const myTypeDefs = `#graphql
  type Query {
    hello: String
    # fetchBoardsCount: Int!
  }
`;

// A map of functions which return data for the schema.
const myResolvers = {
  Query: {
    hello: () => 'Hello World',
  },
//   Query: {
//     fetchBoardsCount: () => 1004
//   },

//   MutationObserver
};

const server = new ApolloServer({
    typeDefs: myTypeDefs,
    resolvers: myResolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port:3000 },
});

console.log(`🚀 Server ready at ${url}`);