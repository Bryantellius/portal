"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class LectureGroup extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.lectures = this.hasMany(models.Lecture, { foreignKey: 'lectureId' });
            this.module = this.belongsTo(models.Module, { foreignKey: 'id' });
            this.quiz = this.hasOne(models.Quiz, { foreignKey: 'lectureGroupId' });
        }
    }
    ;
    LectureGroup.init({
        moduleId: DataTypes.INTEGER,
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'LectureGroup',
    });
    return LectureGroup;
};
//# sourceMappingURL=lecturegroup.js.map