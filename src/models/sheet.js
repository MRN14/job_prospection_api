/**
 * Sheet model
 * 
 * @param {sequelize} sequelize 
 * @param {Sheet} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
    const Sheet = sequelize.define(
      'Sheet',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        }
      }
    );

    return Sheet;
}