const jwt = require('jsonwebtoken')

module.exports = function (req, res, next){
    //read Token Header
    
    const token = req.header('x-auth-token')
    
    //check if token

    if (!token) return res.status(401).send({msg: 'token no exist'})


    //validate token

    try {
        const tokenSuccess = jwt.verify(token, process.env.JWT)
        req.user = tokenSuccess.user
        next()
        
    } catch (error) {
        res.status(401).send({msg: 'token invalid'})
    }
}