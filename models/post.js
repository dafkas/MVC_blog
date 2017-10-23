module.exports = (sequelize, Sequelize) => {

    const Post = sequelize.define('post',  {
        postId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        content: {            
            type: Sequelize.STRING,
            allowNull: false
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
                Post.belongsTo(models.category, {
                    foreignKey: 'categoryId',
                    onDelete: 'SET NULL',
                    allowNull: false
                });
            }
        }
    });

    Post.updatePost = (data) => {
        console.log(data);
        return Post.update({
            title: data.title,
            content: data.content,
            categoryId: data.categoryId
            //status: data.active 
        },{
            where: {
                postId : data.postId
            }
        });
    }
    
    Post.delete = (id) => {
        return Post.destroy({
            where: {
                postId : id
            }
        });
    };
    return Post;
}