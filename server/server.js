const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

const herokuliveURL = null;
const HOST = herokuliveURL || 'https://localhost:3000';

const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });

const ImageKit = require('imagekit');
const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/ofawn8dpgq',
    publicKey: 'public_HCJZE+YwKYecvofGGZ+jCfHG1yw=',
    privateKey: 'private_NREjqTEzNwaan/fSR2WMQDT10VU='
});

// allow cross-origin requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://sleepy-beach-12267-a5c989dbbda6.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/auth', function (req, res) {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
});

app.use(
    express.urlencoded({ extended: true }),
    express.json()
);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`🌍 Now listening on localhost:${PORT}`)
            console.log(`Open GraphQL here: https://studio.apollographql.com/sandbox/explorer`)
        });
    });

};

startApolloServer(typeDefs, resolvers);
