const mongoose=require('mongoose')

const customer=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    product:{
        type:String,
        enum:["Burger","Shawarma","Pizza","Cake"],
        require:true
    },
    bill:{
        type:Number,
        require:true
    }
})

const customerInfo=mongoose.model('Customers',customer)

module.exports=customerInfo