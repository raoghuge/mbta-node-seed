const { Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();
const secret = process.env.SECRET || '1234567';
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};
const json = require('../data/json.reader');

module.exports = passport => {
    passport.use(
        new Strategy(opts, async (payload, done) => {
            let users = await json.readJson('user');
            let user = users.find(function (element) {
                return element.email === payload.email;
            });
            if (user) {
                return done(null, {
                    id: user.id,
                    name: user.firstName,
                    email: user.email,
                });
            } else {
                return done(null, false);
            }
        })
    );
};