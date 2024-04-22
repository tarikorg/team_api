const express = require('express')
const app = express()
const PORT = 3323

const {Client} = require('pg')
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: '1771',
    database: 'student_course_db'
})


//get all courses
app.get('/api/courses', async (req, res)=>{
    const {rows} = await client.query('SELECT * FROM courses')
    console.log(rows)
    res.json(rows)
})


client.connect()
.then(()=>{

    app.listen(PORT,  ()=>{


        console.log('server started');
    })

})




