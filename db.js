const mongoose=require('mongoose')
require('dotenv').config()
const mongourl=process.env.local_url

// const mongourl=process.env.DB_URL

mongoose.connect(mongourl,{
    useUnifiedTopology:true
})

const db=mongoose.connection

db.on('connected',()=>{
    console.log('connected to MongoDB server')
})

db.on('error',()=>{
    console.log('error in connecting MongoDB server')
})

db.on('disconnected',()=>{
    console.log('Disconnected the MongoDB server')
})

module.exports=db