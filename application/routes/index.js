const express=require('express');
const route=express.Router();

const {check,body}=require('express-validator/check');

const authCont=require('../controllers/auth');

route.get("/", authCont.getHomePage);
route.get('/login', authCont.getLoginPage);
route.get('/register', authCont.getRegisterPage);

route.post('/register',[
    body('userName')
    .trim().not().isEmpty().withMessage('Please Enter Name'),
    check('email')
    .trim().not().isEmpty().withMessage('Please Enter Email id').isEmail().withMessage('Please Enter Valid Email id'),check('password')
    .trim().not().isEmpty().withMessage('Please Enter Password'),
    body('cpassword')
    .trim().not().isEmpty().withMessage('Please Enter Confirm Password')
    .custom((value,{req})=>{
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })


], authCont.postRegister);


route.post("/Login",
body('email')
.trim().not().isEmpty().withMessage('Please Enter Email id').isEmail().withMessage('Please Enter Valid Email id'),
body('password')
.trim().not().isEmpty().withMessage('Please Enter Password')
, authCont.postLogin);

module.exports=route;