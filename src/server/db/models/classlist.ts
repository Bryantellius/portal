import { Model } from "sequelize";
export default (sequelize: any, DataTypes: any) => {
  class ClassList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models: any) {
    }
  };
  ClassList.init({
    courseId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClassList',
  });
  return ClassList;
};