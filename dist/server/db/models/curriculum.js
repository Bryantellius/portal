"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Curriculum extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.modules = this.hasMany(models.Module, { foreignKey: 'curriculumId' });
        }
    }
    ;
    Curriculum.init({
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Curriculum',
    });
    return Curriculum;
};
//# sourceMappingURL=curriculum.js.map