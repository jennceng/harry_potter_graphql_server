const { ApolloServer, gql } = require("apollo-server");
const uuidv4 = require("uuid/v4");

const typeDefs = gql`
  type Student {
    id: ID!
    name: String
    guardian: String
    house: String
  }
  type Query {
    numberStudents: Int!
    allStudents: [Student!]
    getStudentById(studentId: ID!): Student
  }
`;

let students = [
  {
    id: "988d60bb-6769-4b36-a26a-cea4da9f734c",
    name: "Harry Potter",
    guardian: "Aunt Petunia",
    house: "GRYFFINDOR"
  },
  {
    id: "5071094f-7a3f-4793-9e08-2ed17387f7b5",
    name: "Ron Weasley",
    guardian: "Molly Weasley",
    house: "GRYFFINDOR"
  }
];

const resolvers = {
  Query: {
    numberStudents: () => students.length,
    allStudents: () => students,
    getStudentById: (_, { studentId }) =>
      students.find(student => student.id === studentId)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
