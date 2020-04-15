const express = require ('express')
const router = express.Router()
const proyectController = require ('../controllers/proyectController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post('/',auth,[
        check('name','Name is empty').not().isEmpty()
    ],
    proyectController.addProyect)

module.exports = router