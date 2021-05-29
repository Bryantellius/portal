"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Quiz extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.questions = this.hasMany(models.QuizQuestion, { foreignKey: 'quizId', as: 'questions' });
        }
    }
    ;
    Quiz.init({
        lectureId: DataTypes.INTEGER,
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Quiz',
    });
    return Quiz;
};
//# sourceMappingURL=quiz.js.map