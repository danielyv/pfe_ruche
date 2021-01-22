module.exports = {
    'secretKey': process.env.secretKey,
    'mongoUrl': `mongodb+srv://${process.env.dbUser}:${process.env.dbPass}@${process.env.dbURL}/${process.env.dbName}`,
    'facebook': {
        clientId: process.env.clientFacebookId,
        clientSecret: process.env.clientFacebookSecret
    }/*,
    'google': {
        clientId: process.env.clientGoogleId,
        clientSecret: process.env.clientGoogleSecret
    }*/
}