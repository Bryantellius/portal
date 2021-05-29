"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Course extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.curriculum = this.hasOne(models.Curriculum, { foreignKey: 'curriculumId' });
        }
    }
    ;
    Course.init({
        instructorId: DataTypes.INTEGER,
        curriculumId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        type: DataTypes.STRING,
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        currentlyActive: DataTypes.BOOLEAN,
        avatarUrl: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Course',
    });
    return Course;
};
//# sourceMappingURL=course.js.map