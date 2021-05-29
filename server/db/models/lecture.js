"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var sequelize_1 = require("sequelize");
exports["default"] = (function (sequelize, DataTypes) {
    var Lecture = /** @class */ (function (_super) {
        __extends(Lecture, _super);
        function Lecture() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        Lecture.associate = function (models) {
            this.quiz = this.hasOne(models.Quiz, { foreignKey: 'lectureId' });
            this.module = this.belongsTo(models.Module, { foreignKey: 'moduleId' });
        };
        return Lecture;
    }(sequelize_1.Model));
    ;
    Lecture.init({
        moduleId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        fileName: DataTypes.STRING
    }, {
        sequelize: sequelize,
        modelName: 'Lecture'
    });
    return Lecture;
});
