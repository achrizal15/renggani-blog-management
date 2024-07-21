import { Sequelize } from "sequelize";
import sequelize from '../config/database.js';
import User from './users.js';

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;

export default db;
