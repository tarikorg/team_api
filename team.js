const { DataTypes, Model } = require('sequelize');
const client = require('./database');

class Team extends Model {
    
 }

Team.init(
    {
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,  //VARCHAR(255)
            allowNull: false,
            validate: {
                notNull: {
                    args: false,
                    msg: 'Cant be null'
                }
            }
        },
        type: {
            type: DataTypes.STRING,  //VARCHAR(255)
            allowNull: false,
            validate: {
                notNull: {
                    args: false,
                    msg: 'Cant be null'
                }
            }
        },
        coach: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize: client,
        modelName: 'team',
        timestamps: false
    }
);

module.exports = Team;