const User = require('../models/User')

exports.userCreate = async (req, res) =>{

        const {email} = req.body
        
        try {
                const user = new User (req.body)
                
                if(await User.findOne({email})){
                        res.status(400).send({msg: 'Email has registed'})
                        return
                }else{
                        await user.save()
                        res.status(200).send({msg: 'User Created'})

                }

        } catch (error) {

                res.status(400).send({msg: error})    
        }
}