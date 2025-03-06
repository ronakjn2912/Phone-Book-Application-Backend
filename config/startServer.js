const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const resolvers = require("../schema/resolvers/resolvers");
const errorFormatter = require("../schema/errorFormatter");
const { default: gql } = require("graphql-tag");
const userTypeDefs = require("../schema/typeDefs/userTypeDefs");
const contactTypeDefs = require("../schema/typeDefs/contactTypeDefs");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const { connectDB } = require("./dbConnection");
const { syncModels } = require("../model/associations");
connectDB();

const baseTypeDefs = gql`
  type Query
  type Mutation
`;
const typeDefs = [baseTypeDefs, userTypeDefs, contactTypeDefs];
async function startServer() {
  try {
    const app = express();
    syncModels()
      .then(() => {
        console.log("Database ready");
      })
      .catch(console.error);
    const server = new ApolloServer({
      typeDefs,
      resolvers: resolvers,
      formatError: errorFormatter,
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();
    app.use("/graphql", expressMiddleware(server));

    app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

module.exports = startServer;
