const { default: gql } = require("graphql-tag");

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type RegisterResponse {
    success: Boolean!
    message: String!
    User: User
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    User: User
  }
  extend type Query {
    user(id: ID!): User
    users: [User]
  }

  extend type Mutation {
    registerUser(
      username: String
      email: String
      password: String
    ): RegisterResponse!

    loginUser(username: String, password: String): LoginResponse!
  }
`;

module.exports = userTypeDefs;
