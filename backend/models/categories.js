import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
}, {
    timestamps: true
});
export default Category;
