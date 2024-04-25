const { Sequelize, DataTypes, Model } = require('sequelize')
const { hash, compare } = require('bcrypt')
const client = new Sequelize(
    'teams_db',
    'postgres',
    'password',
    {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    });


class Team extends Model { }

Team.init(
/*first object */    {

        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,  //VARCHAR(255)
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,  //VARCHAR(255)
            allowNull: false
        },
        coach: {
            type: DataTypes.STRING
        }
    },
/*second object */   {
        sequelize: client,
        modelName: 'team',
    
        timestamps: false
    }
)




class Player extends Model {
    async validatepass(formPassword) {
        const is_Valid = await compare(formPassword, this.password)

        return is_Valid
    }
}

Player.init(
/*first object */    {
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,  //VARCHAR(255)
            allowNull: false,
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
/*second object */   {
        sequelize: client,
        modelName: 'player',
        hooks: {
            async beforeCreate(user) {
                user.password = await hash(user.password, 10)
            }
        },
        timestamps: false
    }
)


Team.belongsToMany(Player, { through: 'team_player' })
Player.belongsToMany(Team, { through: 'team_player' })




client.sync({ force: false })
    .then(async () => {
  
        // const braves = await Team.findByPk(1, {
        //     include: Player

        // })
        //console.log(braves.get({ plain: true}))

        const julie = await Player.findByPk(2, {
            include: Team

        })
        
        console.log(julie.get({ plain: true}))


    //     const julie = await Player.findByPk(2)

    //   await julie.addTeam(braves)

  

    })