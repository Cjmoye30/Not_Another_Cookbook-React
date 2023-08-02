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
        }
    }
);

const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe;