const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require ('jsonwebtoken')


exports.authUser = async (req,res,next) => {
    
    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(400).send(error)

    const {email, password} = req.body

    try {
        let user = await User.findOne({email})
        if(!user){
            res.status(200).send({msg: 'Email or Password incorrect'})
        }
        const successPass = await bcryptjs.compare(password, user.password)
        if(!successPass){
            res.status(200).send({msg: 'Email or Password incorrect'})
        }

        //jwt
        const payload = {
            user:{
                    id: user.id
            }
        }

        jwt.sign(payload,process.env.JWT,{
                expiresIn: 1000000
        },(error,token) =>{
                if (error) throw error
                
                res.status(200).send({token: token})
        })
        //jwt

    } catch (error) {
        res.status(400).send(error)
    }
}