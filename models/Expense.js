'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Expense extends Sequelize.Model {}
        Expense.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            expenseName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            expenseCost: {
                type: Sequelize.INTEGER,
                allowNull: false
            }
        }, { sequelize });

        Expense.associate = (models) => {
            Expense.belongsTo(models.User, {
                as: 'owner',
                 foreignKey: {
                     fieldName: "userId",
                     allowNull: false
                  }
            });
        };

        return Expense;
    }