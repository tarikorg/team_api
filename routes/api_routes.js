// import the team and player models
const router = require('express').Router()


const Team = require('../team')
const Player = require('../player')

// create a GET route to get all teams and attach their assoiciated players
router.get('/teams', async (req, res) => {
    const teams = await Team.findAll({
        include: Player
    })
    res.json(teams)
})

//CREATE A GET route to get all palyers and attach their assoicated teams
router.get('/players', async (req, res) => {
    const players = await Player.findAll({
        include: Team
    })
    res.json(players)
})

//CREATE A GET route to get a single team by ID  and attach their assoicated players
router.get('/teams/:id'), async (req, res) => {
    const id = req.params

    try {
        const team = await Team.findByPk(id, {
            include: Player
        })

        if (!team) {
            return res.status(404).json({ message: 'Team not found' })
        }
        res.json(team)
    } catch (err) {
        console.error(err);
    }
}

//CREATE A GET route to get a single player by ID  and attach their assoicated teams
router.get('/players/:id', async (req, res) => {
    const id = req.params.id

    try {
        const player = await Player.findByPk(id, {
            include: Team
        })
        if (!player) {
            return res.status(404).json({ message: 'Player not found' })
        }
        res.json(player)
    } catch (error) {
        console.error(error)

    }
})





//create a POST route  to create a team = recieve req.body data with the required fields/columns
router.post('/teams', async (req, res) => {
    const { name, type, coach } = req.body // no need id its auto incremented

    try {
        const team = await Team.create({
            name,
            type,
            coach
        })
        res.json(team)
        console.log('a team has been created: ' + team)
    } catch (err) {
        console.error(err)
    }
})


//create a POST  route to create a player
router.post('/players', async (req, res) => {
    const { email, password, first_name, last_name, age } = req.body

    try {
        const player = await Player.create({
            email,
            password,
            first_name,
            last_name,
            age
        })
        res.json(player)
        console.log('a player has been created: ' + player)
    } catch (err) {
        console.error(err)

        const error = err.error.map(eObj => {
            return {
                message: eObj.message
            }
        })

        res.json({
            message: 'Your request failed',
            errors: error
        })
    }
})


// Create a PUT route to update a player's information - (ie. they send an object(req.body) that looks like {first_name: 'Billy'} and you need to update that player's row in the table to now have a first_name of 'Billy')

router.put('/players/:id', async (req, res) => {
    const { id } = req.params
    //get the object given by user 
    const newData = req.body

    try {
        //target the :id Player
        const player = await Player.findByPk(id)

        if (!player) {
            return res.json({ message: 'Player Not Found' })
        }
        // .update()  a sequelize method
        await player.update(newData)
        //show updated player
        res.json(player)
    }catch (err) {
        console.error(err)
        res.json({ message: 'Error' })
    }
})
// Create a PUT route to update a team's information
router.put('/teams/:id', async (req, res) => {
    const { id } = req.params

    // get the object given by user
    const newData = req.body


    try {
        const team = await Team.findByPk(id)


        if (!team) {
            return res.json({ message: 'Team Not found' })
        }
        await team.update(newData)

        res.json(team)
    } catch (err) {
        console.error(err)
        res.json({ message: 'Error' })
    }
})
// =======DELETE
router.delete('/players/:id', async (req, res) => {
    const { id } = req.params

    try {
        const player = await Player.findByPk(id)
        if (!player) {
            return res.json({ message: 'Player Not found' })
        }
        //delete the player
        await player.destroy()

        res.json({ message: "Player is removed" })
    } catch (err) {
        console.error(err)
        res.json({ message: 'Error' })
    }
})


router.delete('/teams/:id', async (req, res) => {
    const { id } = req.params

    try {
        const teams = await Team.findByPk(id)
        if (!teams) {
            return res.json({ message: 'teams Not found' })
        }
        //delete the player
        await teams.destroy()

        res.json({ message: "teams is removed" })
    } catch (err) {
        console.error(err)
        res.json({ message: 'Error' })
    }
})


//create a post route to connect a player with a team

router.post('/connect', async (req,res)=> {
    // user will return the input as json
    const { team_id, player_id } = req.body

    try{
        //find the team
        const team = await Team.findByPk(team_id)
        if(!team){
            return res.json({ message: 'Team not found'})
        }

        //find the player
        const player = await Player.findByPk(player_id)
        if(!player){
            return res.json({message: 'Player not found'})
        }

        //connect
        await team.addPlayer(player)

        res.json({message: "player connected to the given team successfully"})
    }catch(err){
        console.error(err)
        res.json({message: "Error"})
    }
})


//



module.exports = router