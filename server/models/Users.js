const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Basic starter schema for a user(s)
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        // add in a date for when this document was created
        dateCreated: {
            type: Date,
            default: Date.now()
        },

        userBio: {
            type: String,
            minLength: 8,
            maxLength: 280
        },

        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },

        password: {
            type: String,
            required: true,
            min: 7
        },

        avatar: {
            type: String
        },

        images: [
            {
                type: String
            }
        ],

        recipes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Recipe'
            }
        ],

        // returning only a singular recipe - either their own or someone elses.
        favoriteRecipe: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        },

        signatureRecipe: {
            type: Schema.Types.ObjectId,
            ref: 'Recipe'
        },

        // Using a dropdown with a pre-defined list of cuisines
        favoriteCuisine: {
            type: String
        }
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);
module.exports = User;