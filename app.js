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
const res = require('express/lib/response');

//render de vistas


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
            res.render('login',{
                alert: true,
                alertTitle: "Registro de usuario",
                alertMessage: "Exitoso",
                alertIcon: 'success',
                showConfirmButton:false,
                timer: 2000,
                ruta: 'login'
            })
        }
    })
})

//Autenticación de usuarios
app.post('/auth', async (req, res) =>{
    const user = req.body.userAuth;
    const pass = req.body.passAuth;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    console.log(user, pass, passwordHaash, 'resultados aca');
    if(user && pass){
        connection.query('SELECT * FROM  users WHERE user = ?', [user], async (error, results) => {
            console.log(results, 'resultados aca');
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                });
            }else{
                req.session.loggedin = true;
                req.session.name = results[0].name;
                res.render('login', {
                    alert: true,
                    alertTitle: "Conexión exitosa",
                    alertMessage: "Login correcto",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'home'
                });
            }
        })
    }else{
        res.render('login', {
            alert: true,
            alertTitle: "Campo vacío",
            alertMessage: "Por favor ingrese usuario y/o contraseña",
            alertIcon: "error",
            showConfirmButton: false,
            timer: 2000,
            ruta: 'login'
        });
    }
})

//Auth pages
app.get('/home', (req, res)=>{
    if(req.session.loggedin){
        res.render('index',{
            login: true,
            name: req.session.name
        });
    }else{
        res.render('index', {
            login:false,
            name:'Debe iniciar sesión'
        })
    }
})

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy(() =>{
        res.redirect('login')
    })
})

app.listen(3000, (req, res) => {
    console.log('Server Running in http://localhost:3000')
})