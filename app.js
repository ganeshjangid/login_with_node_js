const express=require('express');
const app=new express();

const path=require('path');
const ejs=require('ejs');
const port=6585;

const routes=require('./application/routes/index');

app.set('view engine', 'ejs');
app.set('views','application/views');
app.use(express.static(path.join(__dirname,'public')));


app.use(routes);
app.listen(port,()=>console.log(`This server is running on port no ${port}`));