const Proyect = require('../models/Proyect')
const { validationResult } = require('express-validator')

exports.addProyect = async (req, res, next) => {

    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(400).send({error})

    try {
        const newProyect = new Proyect (req.body)
        newProyect.userCreate = req.user.id
        
        newProyect.save()
        res.status(200).send({msg: 'Proyect Created'})
        
    } catch (error) {
        res.status(500).send({msg: 'Server Error'})
    }
}

exports.listProyect = async ( req, res, next) => {
    try {
        const proyects = await Proyect.find({userCreate: req.user.id})
        res.send(proyects)
        
    } catch (error) {
        res.status(500).send({msg: error})
    }
}

exports.updateProyect = async (req, res, next) => {
    try {

        const error = validationResult(req)
        if(!error.isEmpty()) return res.status(400).send(error)

        const name = req.body
        const newProyect = {}

        if (name) newProyect.name = name


        // ID Success?
        const proyect = await Proyect.findById(req.params.id) 

        // Proyect Success?

        if(!proyect) return res.status(404).send({msg: 'Proyect not Exist'})
        
        // update only user token
        
        if(proyect.userCreate.toString() !== req.user.id) return res.status(401).send({msg: 'User not have authorized'})

        // update
        const updateProyect = await Proyect.findByIdAndUpdate({ _id: req.params.id }, {$set: newProyect.name}, {new: true})
        
        return res.status(200).send({updateProyect})
        
    } catch (error) {
        res.status(500).send({msg: error})
    }
}

exports.deleteProyect = async (req, res, next) => {

    try {

        // ID Success?
        const proyect = await Proyect.findById(req.params.id) 

        // Proyect Success?

        if(!proyect) return res.status(404).send({msg: 'Proyect not Exist'})
        
        // update only user token
        
        if(proyect.userCreate.toString() !== req.user.id) return res.status(401).send({msg: 'User not have authorized'})

        // delete

        const deleteProyect = await Proyect.findByIdAndDelete({_id: req.params.id})

        return res.status(200).send(deleteProyect)
        
    } catch (error) {
        res.status(500).send({msg: error})
    }
}
