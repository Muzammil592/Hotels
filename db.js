const mongoose=require('mongoose')

const mongourl='mongodb://127.0.0.1:27017/hotel'

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