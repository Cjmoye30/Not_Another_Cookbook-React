const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!,
    password: String!
    images: [String]
}

type Auth {
    token: ID!
    user: User
}

# Starting queries to get all users and the user who is signed in
type Query {
    me: User
    getUser(userId: ID!): User
    getAllUsers: [User]
}

type Mutation {
    signup(username: String!, email: String!, firstName: String!, lastName: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs