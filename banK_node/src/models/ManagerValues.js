
const { Model, DataTypes } = require('sequelize');

class ManagerValues extends Model {
    static init(sequelize) {
        super.init({
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        date_inform: DataTypes.DATE,
        }, {
        sequelize,tableName:'manager_values',createdAt:'create_at',updatedAt:false
        })
    }

    static associate(models) {
        this.belongsTo(models.Grid, { foreignKey: 'grid_id', as: 'grid' });
    }
}

module.exports = ManagerValues;