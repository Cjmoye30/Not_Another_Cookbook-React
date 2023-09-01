const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Recipe } = require('../models');

const resolvers = {

    Query: {

        // GET the current user who is signed in
        me: async (parent, args, context) => {
            return await User.findOne({ _id: context.user._id }).populate('recipes')
        },

        // GET single user
        getUser: async (parent, { userId }) => {
            const user = await User.findOne({ _id: userId })
                .populate({
                    path: 'recipes',
                    populate: {
                        path: 'favorites',
                        model: 'User'
                    }
                })
                .populate({
                    path: 'favoriteRecipe',
                    populate: {
                        path: 'favorites',
                        model: 'User'
                    },
                    populate: {
                        path: 'chef',
                        model: 'User'
                    }
                })
                .populate('signatureRecipe')
            return user;
        },

        // GET all users
        getAllUsers: async () => {
            const usersData = await User.find()
                .populate({
                    path: 'recipes',
                    populate: {
                        path: 'favorites',
                        model: 'User'
                    }
                })
                .populate({
                    path: 'favoriteRecipe',
                    populate: {
                        path: 'favorites',
                        model: 'User'
                    },
                    populate: {
                        path: 'chef',
                        model: 'User'
                    }
                })
                .populate('signatureRecipe')
            return usersData;
        },

        // GET all recipes
        getAllRecipes: async () => {
            const recipeData = await Recipe.find().populate('chef')
            return recipeData;
        },

        // GET single recipe
        getRecipe: async (parent, { recipeId }) => {
            const recipe = Recipe.findOne({ _id: recipeId }).populate('chef')
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

            const token = signToken(user)
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

                return newRecipe;

            } catch (err) {
                console.log("ERROR. New recipe not created", err)
            }
        },


        updateProfile: async (parent, { userId, username, email, avatar, userBio, favoriteCuisine }, context) => {
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
                            userBio: userBio,
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
        },

        // add favorite recipe to a user - any recipe in our DB
        // shouold be used when clicking a button on an existing recipe
        addFavoriteRecipe: async (parent, { userId, recipeId }, context) => {
            try {

                // add the recipe to the users profile as a favorite
                const userData = await User.findOneAndUpdate(
                    { _id: userId },
                    { favoriteRecipe: recipeId },
                    { new: true, runValidators: true }
                ).populate('favoriteRecipe')
                console.log(`Added to ${userId}'s favorites: ${recipeId}`)

                // add the userId to the favorites array for the recipe
                const recipeData = await Recipe.findOneAndUpdate(
                    { _id: recipeId },
                    { $addToSet: { favorites: userId } },
                    { new: true, runValidators: true }
                ).populate('favorites')
                console.log(`${userId} added to the array of favorites for: ${recipeId}`)
                console.log(recipeData, userData)
                return userData


            } catch (err) {
                console.log(err)
                throw err
            }
        },

        // add signature recipe to a user - only selection will be from the users recipes
        addSignatureRecipe: async (parent, { userId, recipeId }, context) => {
            try {
                const data = await User.findOneAndUpdate(
                    { _id: userId },
                    { signatureRecipe: recipeId },
                    { new: true, runValidators: true }
                ).populate('signatureRecipe')
                console.log("New signature recipe: ", data)
                return data

            } catch (err) {
                console.log(err)
            }
        },

        // add favorite cuisine to a user - DONE
        addFavoriteCuisine: async (parent, { userId, favoriteCuisine }, context) => {
            try {
                const updateUserData = await User.findOneAndUpdate(
                    { _id: userId },
                    { favoriteCuisine: favoriteCuisine },
                    { new: true, runValidators: true }
                )
                console.log(`New favorite cuisine for ${userId} is now: ${favoriteCuisine}`)
                return updateUserData

            } catch (err) {
                console.log(err)
                throw err
            }
        }
    }
}

module.exports = resolvers;

