import { DataTypes, Model } from 'sequelize';
import mySqlConnection from '../database/database.js';

class Job extends Model { }

Job.init(
  {
    job: {
      type: DataTypes.STRING,
    },

    companyName: {
      type: DataTypes.STRING,
    },

    place: {
      type: DataTypes.STRING,
    },

    status: {
      type: DataTypes.ENUM(
        'application sent',
        'first interview',
        'refused',
        'no response'
      ),
    },

    source: {
      type: DataTypes.STRING,
    },

    contact: {
      type: DataTypes.STRING,
    },

    dispatchDate: {
      type: DataTypes.DATE,
    },

    note: {
      type: DataTypes.TEXT,
    },

    opinion: {
      type: DataTypes.INTEGER,
    }, sheetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sheet', // nom exact de la table
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },

  },
  {
    sequelize: mySqlConnection,
    modelName: 'Job',
    tableName: 'job',
    timestamps: true,
  }
);

export default Job;
