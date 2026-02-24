import { DataTypes, Model } from 'sequelize';
import mySqlConnection from '../database/database.js'; // ton instance sequelize

class User extends Model {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: mySqlConnection,           
    modelName: 'User',   
    tableName: 'user',  
    timestamps: true,    
  }
);

export default User;