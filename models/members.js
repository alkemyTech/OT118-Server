const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    static associate(models) {

    }
  }
  Members.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    facebookUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagramUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    linkedinUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Members',
    tableName: 'members',
    paranoid: true
  });
  return Members;
};
