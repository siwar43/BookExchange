const passport = require('passport');
const UserSchema = require('../models/user');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SecretOrKey,
};
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done)=> {
        try {
            const user = await UserSchema.findOne({ _id : jwt_payload._id});
            user ? done (null, user) : done (null, false);
        } catch (error) {
            console.log(error);
        }
    })
);

module.exports = isAuth = () => 
    passport.authenticate ("jwt", { session : false });
