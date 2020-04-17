const Task = require ('../models/Task')
const Proyect = require('../models/Proyect')
const { validationResult } = require('express-validator')

exports.addTask = async (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) return res.status(400).send({error})

    const {proyect} = req.body

    try {

        const proyectData = await Proyect.findById(proyect)

        if(!proyectData) return res.status(404).send({msg: 'Proyect not exist'})

        if (proyectData.userCreate.toString() !== req.user.id) return res.status(401).send({msg: 'User not authorized'})
        
        const newTask = new Task (req.body)
        await newTask.save()

        res.status(200).send({newTask})

    } catch (error) {
        res.status(500).send({msg: 'Error Server'})
    }
}

exports.listTask = async (req, res, next) => {
    
    const {proyect} = req.body

    try {

        const proyectData = await Proyect.findById(proyect)

        if(!proyectData) return res.status(404).send({msg: 'Proyect not exist'})

        if (proyectData.userCreate.toString() !== req.user.id) return res.status(401).send({msg: 'User not authorized'})
        
        const listTask = await Task.find({proyect})
    
        res.status(200).send({listTask})

    } catch (error) {
        res.status(500).send({msg: 'Error Server'})
    }
    
}