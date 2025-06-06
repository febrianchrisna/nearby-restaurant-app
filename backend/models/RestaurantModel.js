import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Restaurant = db.define("restaurants", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false
    },
    cuisine: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priceRange: {
        type: DataTypes.ENUM('Murah', 'Sedang', 'Mahal'),
        allowNull: false
    },
    averagePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    rating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
        defaultValue: 0.0
    },
    openTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    closeTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, 
{ freezeTableName: true }
);

export default Restaurant;
