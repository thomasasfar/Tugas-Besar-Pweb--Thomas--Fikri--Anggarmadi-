const { Sequelize, DataTypes } = require("sequelize");

const sequilize = new Sequelize("mysql://root@localhost:3306/gpt-team");

const Submissions = sequilize.define(
  "Submissions",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    form_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "Forms",
        key: "form_id",
      },
    },
    uploaded_file: {
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
    tableName: "submissions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Submissions.associate = (models) => {
  Submissions.belongsTo(models.Forms, { foreignKey: "form_Id" });
  Submissions.belongsTo(models.User, { foreignKey: "user_Id" });
};

module.exports = Submissions;
