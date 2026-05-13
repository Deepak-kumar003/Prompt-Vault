const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const authHeader = req.header('Authorization');

    if(!authHeader){
        res.status(401).json({message:"Access denied"})
    }
    try{
        const token = authHeader.split(" ")[1];

        const verifiedData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verifiedData;

        next()
    }
    catch(err){
        return res.status(400).json({ message: `Invalid or expired token.${err.message}` });
    }
}

module.exports = verifyToken