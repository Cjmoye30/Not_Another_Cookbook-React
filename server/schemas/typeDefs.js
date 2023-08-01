const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!,
    avatar: String,
    password: String!
    images: [String]
    recipes: [Recipe]
}

type Auth {
    token: ID!
    user: User
}

type Recipe {
    _id: ID!
    name: String!
    description: String
    ingredients: [String]
    measure: [String]
    instruction: [String]
    images: [String]
    chef: User
}

type Query {
    me: User
    getUser(userId: ID!): User
    getAllUsers: [User]

    getRecipe(recipeId: ID!): Recipe
    getAllRecipes: [Recipe]
}

type Mutation {
    signup(username: String!, email: String!, firstName: String!, lastName: String!, password: String!, avatar: String): Auth
    login(email: String!, password: String!): Auth
    addImage(userId: ID!, imageURL: String!): User

    addRecipe(name: String!, description: String, ingredients: [String], measure: [String], instruction: [String], images: [String]): Recipe
    removeRecipe(recipeId: ID!): Recipe
}
`;

module.exports = typeDefs