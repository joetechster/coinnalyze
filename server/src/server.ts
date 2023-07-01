const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const users = [{ name: "dami" }, { name: "joseph" }];
const typeDefs = `#graphql
    type User { 
        name: String!
    }
    type Query {
        users: [User!]
    }
`;
const resolvers = {
    Query: {
        users: () => users,
    },
};
const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));
