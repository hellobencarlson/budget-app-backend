'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Account extends Sequelize.Model {}
        Account.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            accountName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            accountBalance: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
        }, { sequelize });

        Account.associate = (models) => {
            Account.belongsTo(models.Account, {
                as: 'owner2',
                 foreignKey: {
                     fieldName: "userId",
                  }
            });
        };
    

        return Account;
    }
