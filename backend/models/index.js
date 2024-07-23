import { Sequelize } from "sequelize";
import sequelize from '../config/database.js';
import User from './users.js';
import Tag from "./tags.js";
import Category from "./categories.js";
import Blog from "./blogs.js";

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Tag = Tag;
db.Category = Category;
db.Blog = Blog;

export default db;
