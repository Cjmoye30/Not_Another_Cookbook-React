const { AuthenticationError } = require('apollo-server-express');
// const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {

    Query: {

        // GET the current user who is signed in
        me: async(parent, args, context) => {
            return await User.findOne({_id: context.user.id})
        },

        // GET all users
        getAllUsers: async() => {
            const usersData = await User.find();
            console.log("getAllUsers Query: ", usersData)
            return usersData;
        }

    },

    // Placeholder for mutations
    // Mutation: {

    // }

}

module.exports = resolvers;

