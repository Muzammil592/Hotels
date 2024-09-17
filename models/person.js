const mongoose=require('mongoose')

const personschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        eum:['chef','waiter','manager'],
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    }

})

const person=mongoose.model('person',personschema)
module.exports=person