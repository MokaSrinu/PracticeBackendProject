const express = require('express');
const { check, validationResult } = require("express-validator");
const { signUp, login } =require('../controllers/user');

const userRouter = express.Router();

userRouter.post('/signup',
    [
        check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ], signUp);
userRouter.post('/login', login);
//userRouter.get('/users/getLoggedIn', auth, getLoggedInUser);


module.exports = userRouter;