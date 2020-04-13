const User = require('../models/User')
const bcryptjs = require('bcryptjs')

exports.userCreate = async (req, res) =>{

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
                        res.status(200).send({msg: 'User Created'})

                }

        } catch (error) {

                res.status(400).send({msg: error})    
        }
}