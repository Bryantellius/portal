"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.role = this.belongsTo(models.Role, { foreignKey: "roleId" });
        }
    }
    ;
    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        roleId: DataTypes.INTEGER,
        avatarUrl: DataTypes.STRING,
        lastLectureId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
//# sourceMappingURL=user.js.map