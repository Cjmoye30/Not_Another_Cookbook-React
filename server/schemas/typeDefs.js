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
    dateCreated: String
    userBio: String
    favoriteRecipe: Recipe
    signatureRecipe: Recipe
    favoriteCuisine: String
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
    dateCreated: String
    favorites: [User]
}

type Query {
    me: User
    getUser(userId: ID!): User
    getAllUsers: [User]
    getRecipe(recipeId: ID!): Recipe
    getAllRecipes: [Recipe]
}

type Mutation {
    signup(username: String!, email: String!, firstName: String!, lastName: String!, password: String!, avatar: String, userBio: String): Auth
    login(email: String!, password: String!): Auth
    updateProfile(userId: ID!, username: String, email: String, avatar: String, userBio: String, favoriteCuisine: String): User
    addRecipe(name: String!, description: String, ingredients: [String], measure: [String], instructions: [String], image: [String]): Recipe
    updateRecipe(recipeId: ID!, name: String!, description: String, ingredients: [String], measure: [String], instructions: [String], image: [String]): Recipe
    deleteRecipe(recipeId: ID!): Recipe

    addFavoriteCuisine(userId: ID!, favoriteCuisine: String!): User
    
    addFavoriteRecipe(userId: ID!, recipeId: ID!): User
    addSignatureRecipe(userId: ID!, recipeId: ID!): User
}
`;

module.exports = typeDefs