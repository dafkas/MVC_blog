module.exports = (sequelize, Sequelize) => {

    const Category = sequelize.define('category',  {
        categoryId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        }, {
         classMethods: {
            associate: function(models) {
                Category.belongsTo(models.user, {
                    foreignKey: 'userId',
                    onDelete: 'SET NULL'
                });
                Category.hasMany(models.post, {
                    foreignKey: 'categoryId',
                    onDelete: 'SET NULL'
                });
            },
        }
    });
    
    Category.createCategory = () => {
        Category.create({
            categoryId : 1,
            category: 'No category'
        }); 
    }

    Category.delete = (id) => {
        console.log(id);
        return Category.destroy({
            where: {
                categoryId: id
            }
        });
    };

    return Category;
}