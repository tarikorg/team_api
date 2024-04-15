const express = require('express')

const app = express() // factory constructor/function
const PORT = 3333

const data = [
    {
        id: 1,
        name: 'JD',
        age: 44
    }, 
    {
        id: 2,
        name: 'BOB',
        age: 22
    },
    {
        id: 3,
        name: 'Sarah',
        age: 33
    }
]



//create  a route that listens for tyhe user to visit the root adress/domain
//generates a git route listener
app.get('/', (requestObject, responseObject) => {
    responseObject.send('Hey from the server!')

})

app.get('/api/:user_id',(requestObject, responseObject)=>{
    const id =  requestObject.params.user_id

    // pull the user object from the data array by the id proiperty

   const user = data.find((userObj)=>{
        if(userObj.id == id) return true
   })

   if(user){
    return responseObject.json(user)
   }

   return responseObject.json({
    message: 'user not found matching that id'
   })

})

app.get('/about', (requestObject, responseObject) => {
    responseObject.send('<h1>TARIK</h1>')
})

app.get('/data', (requestObject, responseObject) => {

    const querryParams = requestObject.query

    const obj = {}

    if (querryParams.name == 'true') {
        obj.name = 'JD'
    }

    if (querryParams.age == 'true') {
        obj.age = 44
    }

    console.log(querryParams);


    responseObject.json(obj)


})


// start the server tell the server to start listneing for routes to be visited
//
app.listen(PORT, () => {
    console.log('Server running on port 3333');
})