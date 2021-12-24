
const { Model, DataTypes } = require('sequelize');

class Grid extends Model {
    static init(sequelize) {
        super.init({
        name: DataTypes.STRING,
        date_inform: DataTypes.DATE,
        }, {
        sequelize,tableName:'grid-values',createdAt:'create_at',updatedAt:false
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.hasMany(models.ManagerValues, { foreignKey: 'grid_id', as: 'manager_values' });
    }
}

module.exports = Grid;