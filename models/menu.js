const mongoose=require('mongoose')

const menuschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        eum:['Sweet','Spicy','Sour'],
        require:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingrediants:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }

}) 

const menuitem=mongoose.model('MenuItem',menuschema)
module.exports=menuitem