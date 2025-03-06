const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime();
    }
    throw new Error("GraphQL date scalar serializer expects a Date object");
  },
  parseValue(value) {
    if (typeof value === "number") {
      return new Date(value);
    }
    throw new Error("GraphQL date scalar parser expects a number");
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null
  },
});

module.exports = dateScalar;
