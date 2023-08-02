import { gql } from "@apollo/client";

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            firstName
            lastName
            email
            avatar
            recipes {
                _id
                name
                description
                ingredients
                measure
                instructions
                image
            }
        }
    }

`;

export const GET_ALL_USERS = gql`
    query getAllUsers {
        getAllUsers {
            _id
            username
            firstName
            lastName
            email
            avatar
            recipes {
                _id
                name
                description
                ingredients
                measure
                instructions
                image
            }
        }
    }
`;

export const GET_USER = gql`
    query getUser($userId: ID!) {
        getUser(userId: $userId) {
            _id
            username
            firstName
            lastName
            email
            avatar
            recipes {
                _id
                name
                description
                ingredients
                measure
                instructions
                image
            }
        }     
    }
`;

export const GET_RECIPE = gql`
    query GetRecipe($recipeId: ID!) {
        getRecipe(recipeId: $recipeId) {
            _id
            name
            description
            ingredients
            measure
            instructions
            image
            chef {
                _id
                username
                firstName
                lastName
                avatar
            }
        }
}

`
