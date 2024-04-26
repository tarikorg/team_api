const { DataTypes, Model } = require('sequelize');
const { hash, compare } = require('bcrypt');
const client = require('./database');

class Player extends Model {
    async validatepass(formPassword) {
        const is_Valid = await compare(formPassword, this.password)

        return is_Valid
    }
}

Player.init(
    {
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,  //VARCHAR(255)
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,  //VARCHAR(255)
            validate: {
                len: 6
            },
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,  //VARCHAR(255)
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,  //VARCHAR(255)
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: client,
        modelName: 'player',
        hooks: {
            async beforeCreate(user) {
                user.password = await hash(user.password, 10)
            }
        },
        timestamps: false
    }
);

module.exports = Player;
