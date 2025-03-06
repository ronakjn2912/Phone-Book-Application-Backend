const { GraphQLError } = require("graphql");

function UserInputError(message, properties) {
  const error = new GraphQLError(message, {
    extensions: {
      code: "BAD_USER_INPUT",
      invalidArgs: properties.invalidArgs,
    },
  });
  return error;
}

module.exports = UserInputError;

//properties contain additional information about the error
// In GraphQL, extensions is a way to attach custom metadata to an error. It’s a free-form object that gets included in the error response under the extensions field (per the GraphQL spec).
