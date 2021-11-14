const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
    jwksUri: process.env.JWKS_URI
});

function getKey (header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.publicKey || key.rsaPublickey;
        callback(null, signingKey);
    });
}

function verifyUser(req, errOrUserCallback){
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        jwt.verify(token, getKey, {}, errOrUserCallback);
    }catch (error) {
        errOrUserCallback('Not Authorized');
    }
}

module.exports = verifyUser
