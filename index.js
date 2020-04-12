const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json({ extended: true }))

const PORT = process.env.PORT || 4000

app.use('/api/user', require('./routes/user'))

app.listen(PORT, () =>{
    console.log(`Server Running in port ${PORT}`)
})