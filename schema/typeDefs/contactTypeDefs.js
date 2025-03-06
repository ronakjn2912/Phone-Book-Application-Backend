const { default: gql } = require("graphql-tag");
const dateScalar = require("../../Custom Scalars/Date");

const contactTypeDefs = gql`
  scalar Date
  type Contact {
    id: ID!
    name: String!
    phone: String!
    email: String!
    createdAt: Date!
    cgroup: String!
    favorite: Boolean!
    user_id: Int!
  }

  type Contacts {
    success: Boolean!
    message: String!
    Contacts: [Contact]
  }
  type ContactResponse {
    success: Boolean!
    message: String!
    Contact: Contact
  }

  extend type Query {
    getContacts: Contacts
  }
  extend type Mutation {
    createContact(
      name: String!
      phone: String!
      email: String
      cgroup: String!
      user_id : Int
    ): ContactResponse!
  }
`;

module.exports = contactTypeDefs;
