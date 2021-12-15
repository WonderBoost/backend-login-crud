//Invocamos Express
const express = require('express');
const app = express();

//setting urlencoded para  para capturar datos del form sin errores
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'})

//Directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

// Establecemos el motor de plantillas ejs
app.set('view engine', 'ejs')

//Invocamos a bcryptsjs
const bcryptjs = require('bcryptjs');

//Variables de sesion
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Invocamos al modulo de conexión de db 
const connection = require('./database/db');

//render de vistas
app.get('/', (req, res) =>{
    res.render('index');
})

app.get('/login', (req, res) =>{
    res.render('login');
})

//Registro de users
app.post('/register', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', {user:user, name:name, email:email, pass:passwordHaash}, async(error, results) => {
        if(error){
            console.log(error);
        }else{
            res.send('Registro exitoso')
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('Server Running in http://localhost:3000')
})