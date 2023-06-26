const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
// const sequilize = new Sequelize("mysql://root@localhost:3306/gpt-team");
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

const sequilize = new Sequelize("mysql://kump1665_kumpulin:gpt_teams12@srv49.niagahoster.com/kump1665_gpt_teams");

const Forms = sequilize.define(
  "Forms",
  {
    form_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "forms",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
Forms.prototype.getFormattedUpdatedAt = function () {
  const updatedDate = this.updated_at;
  return new Date(updatedDate).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}; //format tanggal
Forms.associate = (models) => {
  Forms.belongsTo(models.User, { foreignKey: "user_Id" });
};
module.exports = Forms;
