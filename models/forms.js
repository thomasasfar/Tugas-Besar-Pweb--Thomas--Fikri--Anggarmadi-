const { Sequelize, DataTypes } = require('sequelize');

const sequilize = new Sequelize('mysql://root@localhost:3306/gpt-team')

const Forms = sequilize.define('Forms', {
    form_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    },

},
{
    tableName: 'forms',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
module.exports = Forms;