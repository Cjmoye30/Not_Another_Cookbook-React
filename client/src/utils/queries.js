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
            dateCreated
            userBio
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
    query GetAllUsers {
        getAllUsers {
            _id
            username
            firstName
            lastName
            email
            avatar
            dateCreated
            userBio
                recipes {
                _id
                name
                description
                image
                dateCreated
                    favorites {
                        _id
                        username
                        avatar
                    }
                }
                favoriteRecipe {
                _id
                name
                image
                    chef {
                        _id
                        username
                        firstName
                        lastName
                    }
                }
                signatureRecipe {
                _id
                name
                description
                image
                }
            favoriteCuisine
        }
    }
`;

export const GET_USER = gql`
    query GetUser($userId: ID!) {
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
        image
        }
        dateCreated
        userBio
        favoriteRecipe {
        _id
        name
        description
        image
        chef {
            _id
            username
        }
        }
        # signatureRecipe {
        # _id
        # name
        # description
        # image
        # favorites {
        #     _id
        #     username
        # }
        # }
        favoriteCuisine
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
            dateCreated
            chef {
                _id
                username
                firstName
                lastName
                avatar
            }
        }
}
`;

export const GET_ALL_RECIPES = gql`
    query GetAllRecipes {
        getAllRecipes {
            _id
            name
            description
            ingredients
            measure
            instructions
            image
            dateCreated
            chef {
                username
                firstName
                lastName
                email
                avatar
            }
        }
}
`;
