import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database.js'; // ton instance sequelize

class Sheet extends Model { }

Sheet.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Sheet',
        tableName: 'sheet',
        timestamps: true,
    }
);

export default Sheet;