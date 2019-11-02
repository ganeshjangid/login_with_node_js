const express=require('express');
const app=new express();

const path=require('path');
const ejs=require('ejs');
const sequelize=require('./application/config/db');
const port=process.env.port || 6596;

const routes=require('./application/routes/index');
const flash = require('connect-flash');
const bodyParser=require('body-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
var cookieParser = require('cookie-parser')
const csrf=require('csurf');
const morgan=require('morgan');
//const winston=require('./application/config/winston');

const csrfProtection = csrf({ cookie: true });


app.set('view engine', 'ejs');
app.set('views','application/views');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname,'public')));
app.use('logs',express.static(path.join(__dirname,'application/logs')));

app.use(session({
    secret:'my secret',
    saveUninitialized:true,
    resave:true
}));



//app.use(morgan('combined',{steam:winston.stream}));
app.use(cookieParser())
app.use(csrfProtection);
app.use(flash());
app.use(routes);


//sequelize.sync({force: true})
sequelize.sync()
.then(() => {
    app.listen(port, () => console.log(`This server is running on port no ${port}`));
});


