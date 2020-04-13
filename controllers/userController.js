const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require ('jsonwebtoken')

exports.userCreate = async (req, res) =>{

        //express-Validator
        const error = validationResult(req)
        if(!error.isEmpty()) return res.status(400).send(error) 

        const {email, password} = req.body
        
        try {
                const user = new User (req.body)
                
                if(await User.findOne({email})){
                        
                        res.status(400).send({msg: 'Email has registed'})
                        return
                }else{
                        
                        const salt = await bcryptjs.genSalt(10)
                        user.password = await bcryptjs.hash(password, salt)

                        await user.save()

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
                                  
                                res.status(200).send({msg: 'User Created', token: token})
                        })
                        //jwt


                }

        } catch (error) {

                res.status(400).send({msg: error})    
        }
}