const Proyect = require('../models/Proyect')
const { validationResult } = require('express-validator')

exports.addProyect = async (req, res, next) => {

    try {
        const newProyect = new Proyect (req.body)
        newProyect.userCreate = req.user.id
        
        newProyect.save()
        res.status(200).send({msg: 'Proyect Created'})
        
    } catch (error) {
        res.status(500).send({msg: 'Server Error'})
    }
}
