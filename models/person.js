const mongoose=require('mongoose')
const bcrypt=require('bcrypt')


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
    },
    username:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    }

})

personschema.pre('save',async function(next){
    const person=this

    if(!person.isModified('password')) 
        return next()

    try
    {
        const salt =await bcrypt.genSalt(10)

        const hashpass=await bcrypt.hash(person.password,salt)
        person.password=hashpass

        next()

    }
    catch(err)
    {
        next(err)
    }

})
personschema.methods.comparepass=async function(pass){
    try {
        const ismatch=await bcrypt.compare(pass,this.password) //Convert get password into hash with that salt which have been used to encrypt the first data
        return ismatch
    } catch (error) {
        throw error
    }
    
}


const person=mongoose.model('person',personschema)
module.exports=person