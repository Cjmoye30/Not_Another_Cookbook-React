const { Schema, model } = require('mongoose');

const recipeSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        ingredients: [
            {
                type: String
            }
        ],

        measure: [
            {
                type: String
            }
        ],

        instructions: [
            {
                type: String
            }
        ],

        image: [
            {
                type: String
            }
        ],

        chef: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        
        dateCreated: {
            type: Date,
            default: Date.now()
        },

        // returning all of the chefs who like a given recipe
        favorites: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;