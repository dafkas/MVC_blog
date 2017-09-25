const bCrypt = require('bcrypt-nodejs');

module.exports = (sequelize, Sequelize) => {
 
    const User = sequelize.define('user', {
 
        userId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false
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
        }
        },{
        classMethods: {
            associate: function(models) {
                User.hasMany(models.post, {
                    foreignKey: 'userId',
                    onDelete: 'CASCADE'
                });

            }
        }
    });
    
    User.updateUser = (data) => {
        console.log(JSON.stringify(data));
        return User.update({
                name: data.name,
                email: data.email,
                password: User.generateHash(data.password)
            },{
            where: {
                userId: data.userId
            }
        });
    }

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


