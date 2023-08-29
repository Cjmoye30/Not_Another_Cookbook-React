import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;

export const SIGNUP_USER = gql`
    mutation Signup($username: String!, $email: String!, $firstName: String!, $lastName: String!, $password: String!, $avatar: String) {
        signup(username: $username, email: $email, firstName: $firstName, lastName: $lastName, password: $password, avatar: $avatar) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_RECIPE = gql`
    mutation Mutation($name: String!, $description: String, $ingredients: [String], $measure: [String], $instructions: [String], $image: [String]){
        addRecipe(name: $name, description: $description, ingredients: $ingredients, measure: $measure, instructions: $instructions, image: $image) {
            _id
            name
            description
            ingredients
            measure
            image
            chef {
                _id
            }
        }
}
`;

export const UPDATE_RECIPE = gql`
    mutation UpdateRecipe($recipeId: ID!, $name: String!, $description: String, $ingredients: [String], $measure: [String], $instructions: [String], $image: [String]) {
        updateRecipe(recipeId: $recipeId, name: $name, description: $description, ingredients: $ingredients, measure: $measure, instructions: $instructions, image: $image) {
            _id
            name
            description
            ingredients
            measure
            instructions
            image
            chef {
                _id
            }
        }
}
`;

export const DELETE_RECIPE = gql`
    mutation DeleteRecipe($recipeId: ID!) {
        deleteRecipe(recipeId: $recipeId) {
            _id
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($userId: ID!, $username: String, $email: String, $avatar: String, $userBio: String) {
        updateProfile(userId: $userId, username: $username, email: $email, avatar: $avatar, userBio: $userBio) {
            _id
            username
            firstName
            lastName
            email
            userBio
        }
    }
`;

export const ADD_FAVORITE_RECIPE = gql`
    mutation AddFavoriteRecipe($userId: ID!, $recipeId: ID!) {
        addFavoriteRecipe(userId: $userId, recipeId: $recipeId) {
            _id
            username
            favoriteRecipe {
            name
            }
        }
    }
`;

export const ADD_SIGNATURE_RECIPE = gql`
    mutation AddSignatureRecipe($userId: ID!, $recipeId: ID!) {
    addSignatureRecipe(userId: $userId, recipeId: $recipeId) {
        _id
        username
        firstName
        lastName
            signatureRecipe {
            name
            description
            image
                favorites {
                    _id
                    username
                }
            }
        }
    }
`;

export const ADD_FAVORITE_CUISINE = gql`
    mutation AddFavoriteCuisine($userId: ID!, $favoriteCuisine: String!) {
        addFavoriteCuisine(userId: $userId, favoriteCuisine: $favoriteCuisine) {
            _id
            username
            favoriteCuisine
        }
    }   
`;