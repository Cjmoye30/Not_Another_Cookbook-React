import { gql } from "@apollo/client";

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            firstName
            lastName
            email
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
        }
    }
`;