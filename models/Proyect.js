const mongoose = require('mongoose')

const ProyectSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    userCreate:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }},

    {
        timestamp: true
    }
        
)

module.exports = mongoose.model ('Proyect', ProyectSchema)