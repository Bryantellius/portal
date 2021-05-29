import { Model } from "sequelize";
export default (sequelize: any, DataTypes: any) => {
  class AccessToken extends Model {
    static user: any;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
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