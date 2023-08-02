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
    image: [String]
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
    instructions: [String]
    image: [String]
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

    addRecipe(name: String!, description: String, ingredients: [String], measure: [String], instructions: [String], image: [String]): Recipe
    removeRecipe(recipeId: ID!): Recipe
}
`;

module.exports = typeDefs