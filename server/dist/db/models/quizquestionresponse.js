"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class QuizQuestionResponse extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ;
    QuizQuestionResponse.init({
        quizQuestionId: DataTypes.INTEGER,
        value: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'QuizQuestionResponse',
    });
    return QuizQuestionResponse;
};
//# sourceMappingURL=quizquestionresponse.js.map