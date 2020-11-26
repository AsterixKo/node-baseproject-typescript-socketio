import { Model, Sequelize, DataTypes } from 'sequelize';
import { database } from '../database';

export class User extends Model {
    public id!: number;
    public name!: string;
    public familyName!: string;
    public email!: string;
    public password!: string;
    public roleId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    familyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    tableName: 'users',
    sequelize: database // Es donde decimos como conectanros a la base de datos
})