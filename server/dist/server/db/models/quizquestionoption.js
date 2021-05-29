"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class QuizQuestionOption extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ;
    QuizQuestionOption.init({
        quizQuestionId: DataTypes.INTEGER,
        value: DataTypes.STRING,
        text: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'QuizQuestionOption',
    });
    return QuizQuestionOption;
};
//# sourceMappingURL=quizquestionoption.js.map