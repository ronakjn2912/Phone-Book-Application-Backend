const { GraphQLError } = require("graphql");

function Unauthenticated(message, properties) {
  const error = new GraphQLError(message, {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  });

  return error;
}

module.exports = Unauthenticated;