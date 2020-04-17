const mongoose = require ('mongoose')

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    complete:{
        type: Boolean,
        default:false,
        require: true
    },
    proyect:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyect',
        require: true
    }
},
{
    timestamp: true
})

module.exports = mongoose.model ('Task', taskSchema)