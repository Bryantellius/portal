"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Module extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ;
    Module.init({
        curriculumId: DataTypes.INTEGER,
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Module',
    });
    return Module;
};
//# sourceMappingURL=module.js.map