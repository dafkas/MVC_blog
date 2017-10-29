const bCrypt = require('bcrypt-nodejs');

module.exports = (passport, user) =>{
    var User = user;
    const LocalStrategy = require('passport-local').Strategy;

    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user.userId);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, (req, email, password, done) => {
            User.findOne({ where: { email: email }}).then(function(user) {
                if(user){
                    return done(null, false, { message: req.flash('error', 'Email already taken!') });
                } else {
                    if(req.body.name.length < 4){
                        return done(null, false, {
                            message: req.flash('error', 'Name must me a minimum of 4 characters')
                        });
                    } else {
                        const userPassword = User.generateHash(password);
                        const data = {
                            name: req.body.name,
                            email: email,
                            password:userPassword
                        };
                        User.create(data).then(function(newUser, created) {
                            if(!newUser){
                                return done(null, false);
                            }
                            if(newUser) {
                                return done(null, newUser);
                            }
                        });
                    }
                }
            });
        }
    ));

    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            roleField: 'role',
            passReqToCallback: true
    }, (req, email, password, done) => {
        const User = user;
        // console.log(req.session.user);
        User.findOne({where: {email: email}}).then(function(user){
            if(!user || (!User.validatePassword(user ,password))) {
                console.log("password or email invalid!")
                return done(null, false);
            }
            else{
                const userInfo = user.get();
                // console.log(userInfo)
                return done(null, userInfo);
            }
        });
    }));
}