"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Lecture extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.quiz = this.hasOne(models.Quiz, { foreignKey: 'lectureId' });
            this.module = this.belongsTo(models.Module, { foreignKey: 'moduleId' });
        }
    }
    ;
    Lecture.init({
        moduleId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        fileName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Lecture',
    });
    return Lecture;
};
//# sourceMappingURL=lecture.js.map