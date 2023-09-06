const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const app = express();

// Configurar dotenv
dotenv.config({ path: './env/.env' });

// Configuración de Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Configuración de la sesión
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Invocar rutas
const authRoutes = require('./routers/authRoutes');
const indexRoutes = require('./routers/indexRoutes');
const maestroRoutes = require('./routers/maestroRoutes');
const adminRoutes = require('./routers/adminRoutes');
app.use('/', authRoutes);
app.use('/', indexRoutes);

//RUTA MAESTRO
app.use('/user', maestroRoutes);
app.use('/user', adminRoutes);


// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING IN http://localhost:${PORT}`);
});
