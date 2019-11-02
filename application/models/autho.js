const Sequelize = require('sequelize');
const db=require('../config/db');
const bcrypt=require('bcryptjs');

const passport=require('../services/passport');

const User = db.define('users', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const insertRecords=async (data)=>{

    //console.log(data);
    return User.create(data);
};

const chkEmail=async (email)=>{

    return User.findOne({
        where:{
            email:email
        }
    });
};


module.exports={
    insertRecords: insertRecords,
    chkEmail: chkEmail,
    User: User

}


