"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class ClassList extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    }
    ;
    ClassList.init({
        courseId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'ClassList',
    });
    return ClassList;
};
//# sourceMappingURL=classlist.js.map