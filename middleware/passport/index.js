const bCrypt = require('bcrypt-nodejs');

module.exports = (passport, user) =>{
    var User = user;
    const LocalStrategy = require('passport-local').Strategy;

    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user.id);
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
        },

        (req, email, password, done) => {
            const generateHash = (password) =>{
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);       
            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if(user){
                    return done(null, false, {
                        message: 'Email already taken'
                    });
                } else {
                    const userPassword = generateHash(password);
                    const data = {
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
            });
        }
    ));
    
    passport.use('local-signin', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true

    },
    (req, email, password, done) => {
        const User = user;

        const isValidPassword = (userPassword, password) => {
            return bCrypt.compareSync(password, userPassword);
        }

        User.findOne({where: {email: email}}).then(function(user){

            const userInfo = user.get();

            return done(null, user);
        });
    }
    ))
}