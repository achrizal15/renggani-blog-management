import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt'

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_login_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },

}, {
    timestamps: true,
});
User.beforeCreate(async(user,option)=>{
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password,salt)
})
export default User;
