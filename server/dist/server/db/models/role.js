"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Role extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) { }
    }
    ;
    Role.init({
        title: DataTypes.STRING,
        access: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Role',
    });
    return Role;
};
//# sourceMappingURL=role.js.map