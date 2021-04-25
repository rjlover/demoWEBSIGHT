const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });


const PORT = process.env.PORT || 4080;

let db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

db.connect((err) => {
    if (err) throw err
    console.log("Database Connected!!!");
});

//dynamic render in public folder
const publicDir = path.join(__dirname, './public');
app.use(express.static(publicDir));


//view engine setup
app.set('view engine', 'hbs');
const viewDir = path.join(__dirname, './templates/views');
app.set('views', viewDir);

//defining partial files
const partialDir = path.join(__dirname, './templates/partial');
hbs.registerPartials(partialDir);

//using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//defining routing page
app.use('/', require('./routes/fRouting'));
app.use('/auth', require('./routes/bRouting'));


//server listening
app.listen(PORT, () => {
    console.log(`Server is running at port = ${PORT}`);
});