const { Sequelize } = require('sequelize');
require('dotenv').config()
const client = require('./database');
const Team = require('./team');
const Player = require('./player');




const express = require('express')
const app = express()
const PORT = process.env.PORT || 3454


Team.belongsToMany(Player, { through: 'team_player' });
Player.belongsToMany(Team, { through: 'team_player' });


//import routers
const api_routes = require('./routes/api_routes')

//open the json middleware
app.use(express.json())

//load routes
app.use('/api', api_routes)



//sync the models and db
client.sync({ force: false })
    .then(async () => {
        //start the server
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
