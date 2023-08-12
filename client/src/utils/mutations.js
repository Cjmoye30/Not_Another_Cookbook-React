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

export const ADD_IMAGE = gql`
    mutation AddImage($userId: ID!, $imageURL: String!) {
        addImage(userId: $userId, imageURL: $imageURL) {
            _id
            username
            firstName
            lastName
            avatar
            email
            images
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
    mutation UpdateProfile($userId: ID!, $username: String, $email: String, $avatar: String) {
        updateProfile(userId: $userId, username: $username, email: $email, avatar: $avatar) {
            _id
            username
            firstName
            lastName
            email
        }
    }
`;
