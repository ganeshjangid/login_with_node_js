const modelAutho=require('../models/autho');
const {validationResult}=require('express-validator/check');
const bcrypt = require('bcryptjs');

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const comparePw = (userpass, password)=>{
    return bcrypt.compareSync(password, userpass);
};

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
        errorMsg:'',
        csrfToken: req.csrfToken(),
        outputError:''
        
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

       // console.log(error.array());     
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

    modelAutho.User.findOne({
        where:{
            email:email
        }
    })
    .then((user) => {
        
        //console.log(user);
        if (user) {
            return res.status(422).render('register', {
                title: 'Register Page',
                path: 'register',
                errorMsg: "Email id already Exist!",
                validationError: [],
                outputError: {
                    name: name,
                    email: email,
                    pw: pw
                },
                csrfToken: req.csrfToken()
            });
        }else{
             const userPassword = generateHash(pw);
             //console.log(userPassword);

             let data={
                name: name,
                email: email,
                password: userPassword
                /* password: userPassword */
             };

             modelAutho.insertRecords(data)
            .then((users) => {
               // console.log(users);
                return res.status(422).render('register', {
                    title: 'Register Page',
                    path: 'register',
                    errorMsg: "Successfully registered...",
                    validationError: [],
                    outputError: {
                        name: '',
                        email: '',
                        pw: ''
                    },
                    csrfToken: req.csrfToken()
                });

            }).catch((err) => {
                console.log("Error: "+err);
            });

             


        }
    }).catch((err) => {
        console.log(err);
    });
};



exports.postLogin=(req,res)=>{

    //console.log(req.body);
    const {email,password}=req.body;

    //console.log(email);
    const error = validationResult(req);

     if (!error.isEmpty()) {

         // console.log(error.array());     
         return res.status(422).render('login', {
             title: 'Login Page',
             path: 'login',
             errorMsg: error.array()[0].msg,
             validationError: error.array(),
            outputError: {email: email},
             csrfToken: req.csrfToken()

         });
     }


     modelAutho.chkEmail(email)
     .then((user)=>{
        //console.log(email);
        if(!user){
            return res.status(422).render('login', {
                title: 'Login Page',
                path: 'login',
                errorMsg: 'Email Id does not Exist',
                validationError: error.array(),
                outputError: {
                    email: email
                },
                csrfToken: req.csrfToken()

            });
        } 

        const checkPw = comparePw(user.password, password);
        //console.log(checkPw);
        if (checkPw){
            
        }else{
            return res.status(422).render('login', {
                title: 'Login Page',
                path: 'login',
                errorMsg: 'Password does not Exist',
                validationError: error.array(),
                outputError: {
                    email: email
                },
                csrfToken: req.csrfToken()

            });
        }



     })
     .catch(err=>{
        console.log(err);
     });





};





