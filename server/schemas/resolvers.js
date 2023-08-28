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
        signup: async (parent, { username, email, firstName, lastName, password, avatar, userBio }) => {

            // if their email already exists - redirect to the login page
            const checkUser = await User.findOne({ email: email })
            if (checkUser) {
                console.log(`${checkUser.email} is already in the database! redirect to login`);
                throw new AuthenticationError('Email already exists.')
            }

            const newUser = await User.create({ username, email, firstName, lastName, password, avatar, userBio });
            console.log("New User Info: ", newUser)

            const token = signToken(newUser);
            console.log("New User Token: ", token)

            return { token, newUser }
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw new AuthenticationError(`Email not found`)
            }

            const checkPassword = await user.isCorrectPassword(password);

            if (!checkPassword) {
                throw new AuthenticationError(`Incorrect password`)
            }

            console.log(`Loggin in : ${email}`)

            const token = signToken(user)
            console.log("Logged in User Token: ", token)

            return { token, user }
        },

        addRecipe: async (parent, { name, description, ingredients, measure, instructions, image }, context) => {

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
                    { _id: context.user._id },
                    { $addToSet: { recipes: newRecipe._id } }
                )

                console.log("NEW RECIPE CREATED", newRecipe);
                console.log("ADD TO USER?: ", addToUser);
                return newRecipe;

            } catch (err) {
                console.log("ERROR. New recipe not created", err)
            }
        },


        updateProfile: async (parent, { userId, username, email, avatar, userBio }, context) => {
            // only able to edit username, email, and avatar
            try {
                console.log("request from update profile resolver.")
                console.log("User to be updated: ", userId)

                const updateProfile = await User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $set: {
                            email: email,
                            username: username,
                            avatar: avatar,
                            userBio: userBio
                        }
                    },
                    { new: true, runValidators: true }
                )

                //update the token with the new info
                console.log("SUCCESS! Updated profile: ", updateProfile);
                const token = signToken(updateProfile)
                console.log("update token: ", token)

                return updateProfile

            } catch (err) {
                console.log("ERROR from update profile resolver", err)
            }

        },

        // update recipe - find one and update based on the ID and then pass in all of the variables
        updateRecipe: async (parent, { recipeId, name, description, ingredients, measure, instructions, image }, context) => {
            console.log("Update RecipeId: ", recipeId);

            try {
                const updateRecipe = await Recipe.findOneAndUpdate(
                    { _id: recipeId },
                    {
                        $set:
                        {
                            name: name,
                            description: description,
                            ingredients: ingredients,
                            measure: measure,
                            instructions: instructions,
                            image: image
                        }
                    },
                    { $addToSet: { image: image } },
                    { new: true, runValidators: true }
                )
                return updateRecipe
            } catch (err) {
                console.log("ERROR. Recipe not updated: ", err)
            }
        },

        deleteRecipe: async (parent, { recipeId }, context) => {
            return Recipe.findOneAndDelete({ _id: recipeId })
        }
    }
}

module.exports = resolvers;

