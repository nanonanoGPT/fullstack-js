import Sequelize from "sequelize"

// import { DataTypes } from "sequelize/types/data-types";
import db from "../config/Database.js"

const DataTypes = Sequelize;

const Users = db.define('users', {
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
    email:{
        type: DataTypes.STRING,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
            // len: [3,100]
            isEmail: true 
        }
    },
    password:{
        type: DataTypes.STRING,
        // defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
            // len: [3,100]
        }
    },
    role:{
        type: DataTypes.STRING,
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


export default Users;