import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './users.js';
import Tag from './tags.js';
import Category from './categories.js';

const Blog = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sub_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('draf', 'released'),
        defaultValue: 'draf',
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    released_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Categories',
            key: 'id'
        }
    },
    released_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true
});
Blog.belongsTo(Category, {
    foreignKey: {
        name: 'category_id',
        allowNull: true
    },
    as: 'category',
});
Blog.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'publisher',
});
Blog.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'creator',
});
Blog.belongsTo(User, {
    foreignKey: 'updated_by',
    as: 'updater'
});
Blog.belongsToMany(Tag, { through: 'BlogTags', as: 'tags' });
Tag.belongsToMany(Blog, { through: 'BlogTags' });
export default Blog;
