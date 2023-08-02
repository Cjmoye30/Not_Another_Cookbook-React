const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Recipe } = require('../models');

const resolvers = {

    Query: {

        // GET the current user who is signed in
        me: async (parent, args, context) => {
            console.log("Hello from resovlers");
            console.log(context.user._id)
            return await User.findOne({ _id: context.user._id }).populate('recipes')
        },

        // GET single user
        getUser: async (parent, { userId }) => {
            const user = await User.findOne({ _id: userId }).populate('recipes')
            console.log("User for single user query: ", user);
            return user;
        },

        // GET all users
        getAllUsers: async () => {
            const usersData = await User.find().populate('recipes');
            console.log("getAllUsers Query: ", usersData)
            return usersData;
        },

        // GET all recipes
        getAllRecipes: async () => {
            const recipeData = await Recipe.find().populate('chef')
            console.log("RESOLVERS - All Recipe Data: ", recipeData);
            return recipeData;
        },

        // GET single recipe
        getRecipe: async (parent, { recipeId }) => {
            const recipe = Recipe.findOne({ _id: recipeId }).populate('chef')
            console.log("RESOLVERS - Single Recipe Data: ", recipe);
            return recipe;
        }
    },

    Mutation: {
        signup: async (parent, { username, email, firstName, lastName, password, avatar }) => {
            const newUser = await User.create({ username, email, firstName, lastName, password, avatar });
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
        },

        addImage: async (parent, { userId, imageURL }, context) => {
            const newImage = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { images: imageURL } },
                { new: true, runValidators: true }
            )

            return newImage;
        },

        addRecipe: async (parent, {name, description, ingredients, measure, instructions, image }, context) => {

            try {
                const newRecipe = await Recipe.create({ 
                    chef: context.user._id, 
                    name: name, 
                    description: description, 
                    ingredients: ingredients, 
                    measure: measure,
                    instructions: instructions,
                    image: image 
                })

                const addToUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {recipes: newRecipe._id}}
                )

                console.log("NEW RECIPE CREATED", newRecipe);
                console.log("ADD TO USER?: ", addToUser);
                return newRecipe;

            } catch (err) {
                console.log("ERROR. New recipe not created", err)
            }
        }
    }
}

module.exports = resolvers;

