const jwt = require('jsonwebtoken');
const jwtSecret = "Bhavikisagoodboyandheisbest";

const fetchuser = (req, res, next) => {
    //get the user from the jwt token add it to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using  a valid token "})
    }
    try {
        //verify token
    const data = jwt.verify(token,jwtSecret) //verifying token and secret key
    req.user = data.user; // i will get the user and next will get run
    next();
    } catch (error) { //token failed to verify 
        res.status(401).send({error: "Please authenticate using  a valid token "})
    }
    
}

module.exports = fetchuser;
