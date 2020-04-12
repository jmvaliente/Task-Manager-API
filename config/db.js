const mongoose = require ('mongoose')
require ('dotenv').config({path: '.env'})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        })
        console.log('Connect DB Success')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB