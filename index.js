const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()

connectDB()

app.use(cors())

app.use(express.json({ extended: true }))

const PORT = process.env.PORT || 4000


app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyect', require('./routes/proyect'))
app.use('/api/task', require('./routes/task'))

app.listen(PORT, () =>{
    console.log(`Server Running in port ${PORT}`)
})