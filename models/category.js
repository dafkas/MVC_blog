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
                Category.hasMany(models.post, {
                    foreignKey: 'categoryId',
                    onDelete: 'CASCADE'
                });
            }
        }
    });

    this.create = (data) => {
        return Category.create({});
    };

    return Category;
}