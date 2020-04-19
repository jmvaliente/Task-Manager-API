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

exports.updateTask = async (req, res, next) => {
    
    try {
        const error = validationResult(req)
        if(!error.isEmpty()) return res.status(400).send({error})

        const {name, complete} = req.body
        const newTask = {}

        if (name) newTask.name = name
        if (complete) newTask.complete = complete


        const task = await Task.findById(req.params.id)
        const proyect = await Proyect.findById(task.proyect)

        if (!task) return res.status(404).send({msg: 'Task not exist'})

        if(proyect.userCreate.toString() !== req.user.id) return res.status(401).send({msg: 'User not have authorized'})

        console.log(proyect)
        const updateTask = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true})
        return res.status(200).send({updateTask})

    } catch (error) {
        res.status(500).send({msg: 'Error Server'})
    }


}

exports.deleteTask = async (req, res, next) =>{

    try {
        
    } catch (error) {
        
    }
}