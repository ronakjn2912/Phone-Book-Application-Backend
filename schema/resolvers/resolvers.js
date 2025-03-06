const dateScalar = require("../../Custom Scalars/Date");
const {
  createContactResolver,
  getContactsResolver,
} = require("./contactResolvers");
const { registerUserResolver, loginUserResolver } = require("./userResolvers");

const resolvers = {
  Date : dateScalar,
  Query: {
    getContacts: getContactsResolver,
  },
  Mutation: {
    registerUser: registerUserResolver,
    createContact: createContactResolver,
    loginUser: loginUserResolver,
  },
};

module.exports = resolvers;
