const express = require('express');
const app = express()
const models = require('./models')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())

function authenticate(req, res, next){
    
    let headers = req.headers['authorization']
    let token = headers.split(' ')[1]

    jwt.verify(token, 'secret',(err, decoded)=>{
        if(decoded){
            if(decoded.username){
                console.log(decoded.userId)
                req.userId = decoded.userId
                next()
            }else{
                res.status(401).json({message:'Token invalid'})
            }
        }else{
            res.status(401).json({message:'Token innvalid'})
        }
    })

}

app.post('/register', (req, res)=>{

    let username = req.body.username
    let password = req.body.password
    models.User.findOne({
        where:{
            username:username
        }
    }).then(function(user){
        if(user != null){
            res.json({message: "That username is already taken, please try again."})
        }else(
            bcrypt.hash(password, saltRounds, function(error, hash){
                models.User.create({
                    username: username,
                    password: hash
                })
                .then(res.json({success: 'Successfully Registered, Please Login'}))
                
            })
        )
    })
})

app.post('/login', (req,res)=>{
    let username = req.body.username
    models.User.findOne({
        where: {
            username: username
        }
    })
    .then((user)=>{
        if(!user){
             
            res.json({message:'Username not found, try again!'})
        }else{
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(result == true){

                    jwt.sign({ username: username, userId: user.id }, 'secret', function(err, token){
    
                        if(token){
                            res.json({token: token})
                        }else{
                            res.json({message: 'Something went wrong, try again!'})
                        }
                    })
                    
                } else {
                    res.json({message: 'Invalid password!'})
                }
            })
        }

            
    })
    
})

    


app.get('/api/hiking-history', authenticate, async(req, res)=>{

   //sending hiking history to client
    let hikingRecords = await models.Hike.findAll({
        where:{userId: req.userId}
    })
    res.json(hikingRecords)
})

app.post('/api/record-hike',authenticate,(req,res)=>{
    
    let lat = req.body.latitude
    let long = req.body.longitude
    let userId = req.userId
    let timestamp = req.body.timestamp

    //create hike history model
    let hikingHistory = models.Hike.build({
        latitude:lat,
        longitude:long,
        userId: userId, 
        timestamp: timestamp
    })

    //save model
    hikingHistory.save()
    .then((newHike)=>{
        res.json({success: true, message:'Hiking Record Saved!'})
    }).catch(error => {
        console.log(error)
        res.json({success: false, message:'Hike not recorded!'})})
})

app.delete('/delete/:id', authenticate,(req, res)=>{
  
    let hikeId = req.params.id 
    
    models.Hike.destroy({
        where:{
            id:hikeId
        }
    }).then(hike => {
        res.json(hike)
    })
    })


app.listen(PORT, ()=>{
    console.log('Server is running...')
})