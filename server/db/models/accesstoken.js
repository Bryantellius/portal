import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class AccessToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.user = this.belongsTo(models.User);
    }
  };
  AccessToken.init({
    userId: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expires: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'AccessToken',
  });
  return AccessToken;
};