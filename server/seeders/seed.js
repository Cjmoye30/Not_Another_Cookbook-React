const db = require('../config/connection');
const { User, Recipe } = require('../models');
const userSeeds = require('./userSeeds');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Recipe.deleteMany({});
        console.log(userSeeds)
        const newUsers = await User.create(userSeeds);
        console.log("User Seed Data: ", newUsers);
        console.log('Seeding Done.');
        process.exit(0);
    } catch (err) {
        console.error(err);
    }
});