const express = require ('express')
const router = express.Router()
const authController = require ('../controllers/authController')
const { check } = require('express-validator')

router.post('/',[
        check('email', 'Email is empty').isEmail(),
        check('password','Password is more short: min 6 characteres').isLength({min:6})
    ],
    authController.authUser)

module.exports = router