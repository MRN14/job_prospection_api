/**
 * jobOffer model
 * 
 * @param {sequelize} sequelize 
 * @param {JobOffer} DataTypes 
 * @returns 
 */
module.exports = (sequelize, DataTypes) => {
    const JobOffer = sequelize.define(
        'JobOffer',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            job: {
                type: DataTypes.STRING,
            },
            companyName: {
                type: DataTypes.STRING
            },
            place: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.ENUM({
                    values: ['Candidature envoyée', 'Premier entretien', 'Refusée', 'Sans réponse']
                })
            },
            source: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contact: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dispatchDate: {
                type: DataTypes.DATE
            },
            note: {
                type: DataTypes.TEXT
            },
            opinion: {
                type: DataTypes.INTEGER
            }
        }
    );

    return JobOffer;
}