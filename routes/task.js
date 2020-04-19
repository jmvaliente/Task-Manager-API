const express = require('express')
const router = express.Router()
const taskController = require ('../controllers/taskController')
const { check } = require ('express-validator')
const auth = require('../middleware/auth')

router.post('/',
                auth,
                [
                    check('name','name is empty').not().isEmpty()
                ],
                taskController.addTask)

router.get('/',
                auth,
                taskController.listTask)

router.put('/:id',
                auth,
                taskController.updateTask)

router.delete('/:id',
                    auth,
                    taskController.deleteTask)

module.exports = router