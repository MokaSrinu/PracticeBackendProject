const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyparser = require('body-parser');

//Configuring dotenv
dotenv.config();

const app = express();

// Settingup middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieparser());
app.use(cors());


const userCredentials = {
    username: 'admin',
    password: 'admin123',
    email: 'admin@gmail.com'
}

app.post('/login', (req, res) => {
    // Destructuring username & password from body
    const { username, password } = req.body;

    // Checking if credentials match
    if (username === userCredentials.username && 
        password === userCredentials.password) {
        
        //creating a access token
        const accessToken = jwt.sign({
            username: userCredentials.username,
            email: userCredentials.email
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10m'
        });
        // Creating refresh token not that expiry of refresh 
        //token is greater than the access token
        
        const refreshToken = jwt.sign({
            username: userCredentials.username,
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        // Assigning refresh token in http-only cookie 
        res.cookie('jwt', refreshToken, { httpOnly: true, 
            sameSite: 'None', secure: true, 
            maxAge: 24 * 60 * 60 * 1000 });
        return res.json({ 
            status: 'Logged In!',
            accessToken,
            refreshToken 
        });
    }
    else {
        // Return unauthorized error if credentials don't match
        return res.status(406).json({ 
            message: 'Invalid credentials' });
    }
})

app.post('/refresh', (req, res) => {
    if (req.body.jwt) {

        // Destructuring refreshToken from cookie
        const refreshToken = req.body.jwt;

        // Verifying refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {

                // Wrong Refesh Token
                return res.status(406).json({ message: 'Unauthorized' });
            }
            else {
                console.log(decoded)
                // Correct token we send a new access token
                const accessToken = jwt.sign({
                    username: userCredentials.username,
                    email: userCredentials.email
                }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '10m'
                });
                return res.json({ accessToken });
            }
        })
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server active on http://localhost:${process.env.PORT}!`);
})
