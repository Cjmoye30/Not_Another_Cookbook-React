const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!,
    password: String!
}

type Auth {
    token: ID!
    user: User
}

# Starting queries to get all users and the user who is signed in
type Query {
    me: User
    getAllUsers: [User]
}

# placeholder for mutations
# type Mutation {

# }


`;

module.exports = typeDefs