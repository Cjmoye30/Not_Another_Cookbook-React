const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');
const { findOne } = require('../models/Users');

const resolvers = {

    Query: {

        // GET the current user who is signed in
        me: async (parent, args, context) => {
            console.log("Hello from resovlers");
            console.log(context.user.id)
            return await User.findOne({ _id: context.user._id })
        },

        // GET single user
        getUser: async (parent, { userId }) => {
            const user = await User.findOne({ _id: userId });
            console.log("User for single user query: ",user);
            return user;
        },

        // GET all users
        getAllUsers: async () => {
            const usersData = await User.find();
            console.log("getAllUsers Query: ", usersData)
            return usersData;
        }

    },

    // Placeholder for mutations
    Mutation: {
        signup: async (parent, { username, email, firstName, lastName, password }) => {
            const newUser = await User.create({ username, email, firstName, lastName, password });
            console.log("New User Info: ", newUser)

            const token = signToken(newUser);
            console.log("New User Token: ", token)

            return { token, newUser }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!email) {
                throw new AuthenticationError(`ERROR: ${email} was not found in the database.`)
            }

            const checkPassword = await user.isCorrectPassword(password);

            if (!checkPassword) {
                throw new AuthenticationError(`ERROR: Invalid password.`)
            }

            console.log(`Loggin in : ${email}`)

            const token = signToken(user)
            console.log("Logged in User Token: ", token)

            return { token, user }

        }
    }

}

module.exports = resolvers;

