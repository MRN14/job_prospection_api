import { DataTypes, Model } from 'sequelize';
import mySqlConnection from '../database/database.js'; // ton instance sequelize

class Sheet extends Model { }

Sheet.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        mySqlConnection,
        modelName: 'Sheet',
        tableName: 'sheet',
        timestamps: true,
    }
);

export default Sheet;