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

        images: [
            {
                type: String
            }
        ]
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