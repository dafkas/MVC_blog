module.exports = (sequelize, Sequelize) => {

    const Post = sequelize.define('post',  {
        postId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {            
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
    }, {
         classMethods: {
            associate: function(models) {
                Post.belongsTo(models.user, {
                    foreignKey: 'userId',
                    onDelete: 'CASCADE'
                });

            }
        }
    });

    return Post;
}