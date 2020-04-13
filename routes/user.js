const express = require ('express')
const router = express.Router()
const userController = require ('../controllers/userController')
const { check } = require('express-validator')

router.post('/',[
        check('name','Name is empty').not().isEmpty(),
        check('email', 'Email is empty').isEmail(),
        check('password','Password is more short: min 6 characteres').isLength({min:6})
    ],
    userController.userCreate)

module.exports = router