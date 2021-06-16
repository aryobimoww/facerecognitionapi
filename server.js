//-server node.js



// const http = require('http');

// const server = http.createServer((request,response) => {
//     // console.log('headers',request.headers);
//     console.log('method',request.method);
//     console.log('url',request.url);
//     const user = {
//         name:'Bobby',
//         hobby:'skate'
//     }
//     response.setHeader('Content-Typet',"application/json");
//     response.end(JSON.stringify(user));
// });
// server.listen(3000);

//-server express.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const postgres = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '12345',
      database : 'smart_brain'
    }
  });
 
const db = {
users: [
         {
            id: '1',
            name:'Ara',
            password:'123',
            email:'ara@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name:'Sifa',
            password:'abc',
            email:'sifa@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login:[
        {
            id:'987',
            has:' ',
            email:'ara@gmail.com'
        }
    ]
}
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {res.send(postgres.users)})
app.post('/signin', (req,res) => {signin.handleSignin(req,res,postgres,bcrypt)})
app.post('/register',(req,res) => {register.handleRegister(req, res, postgres,bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,postgres)} )
app.put('/image',(req,res) => {image.handleImage(req,res,postgres)} )
app.post('/imageurl',(req,res) => {image.handleApi(req,res)} )
//         if(!found){
//             res.status(400).json('no user');
//         }  
// })





app.listen(3000, ()=>{
    console.log('app is running on port 3000');
});

/*
--> res = this is working
 /signin --> POST = succses/fail
 /registr --> POST = user

 /profile/:userId --> GET = user
/image --> PUT --> user

*/