import Sequelize from "sequelize"
import Users from "./UserModel.js";

// import { DataTypes } from "sequelize/types/data-types";
import db from "../config/Database.js"

const DataTypes = Sequelize;

const Products = db.define('product', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3,100]
        }
    },
    price:{
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
            // len: [3,100]
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
            // len: [3,100]
        }
    }
},{
    freezeTableName: true

});

Users.hasMany(Products);
Products.belongsTo(Users, {foreignKey: 'userId'});

export default Products;