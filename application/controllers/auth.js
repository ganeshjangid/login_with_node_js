const modelAutho=require('../models/autho');

const {validationResult}=require('express-validator/check');

exports.getHomePage=(req,res,next)=>{
    //res.send("Hello World");
    res.render('home',{
        title:'Home page',
        path:'home'
    });
};

exports.getLoginPage = (req, res, next) => {
    //res.send("Hello World");
    res.render('login', {
        title: 'Login Page',
        path:'login',
        
    });
};

exports.getRegisterPage = (req, res, next) => {
    //res.send("Hello World");
    //console.log(req.flash());
    
    res.render('register', {
        title: 'Registation Page',
        path:'register',
        errorMsg: req.flash('errors'),
        outputError: {
            name: '',
            email: '',
            pw: ''
        },
        csrfToken: req.csrfToken()
    });
};


exports.postRegister=(req,res,next)=>{

    //console.log(req.csrfToken());
    
    const name = req.body.userName;
    const email=req.body.email;
    const pw=req.body.password;
    const cPw = req.body.cpassword;

    const error = validationResult(req);

    if (!error.isEmpty()) {

          //console.log(error.array());

        return res.status(422).render('register',{
            title:'Register Page',
            path:'register',
            errorMsg: error.array()[0].msg,
            validationError: error.array(),
            outputError:{
                name:name,
                email: email,
                pw: pw
            },
            csrfToken: req.csrfToken()
        }); 
    }
};