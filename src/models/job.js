import { DataTypes, Model } from 'sequelize';
import mySqlConnection from '../config/database.js';

class Job extends Model {}

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
    },
  },
  {
    mySqlConnection,
    modelName: 'Job',
    tableName: 'job',
    timestamps: true,
  }
);

export default Job;
