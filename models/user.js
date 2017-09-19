const bCrypt = require('bcrypt-nodejs');

module.exports = (sequelize, Sequelize) => {
 
    const User = sequelize.define('user', {
 
        userId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        role: {
            type: Sequelize.ENUM('admin', 'regular'),
            defaultValue: 'regular'
        },
 
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
    });

    User.delete = (id) => {
        return User.destroy({
            where: {
                userId: id
            }
        });
    }

    User.generateHash = (password) => {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);   
    };    
    
    User.validatePassword = (user ,password) => {
        return bCrypt.compareSync(password, user.password);   
    };



    return User;
}


