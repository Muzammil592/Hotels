const express=require('express')
const router=express.Router()
const Customer=require('../models/customer')

router.post('/',async(req,res)=>{
    try{
      const data=req.body

      const customer=new Customer(data)

      const resp= await customer.save()

      res.status(200).json(resp)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
})


router.get('/',async(req,res)=>{
    try{
         const data=await Customer.find()

         res.status(200).json(data)
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:'Internal Server Error'})
    }
})

router.get('/:product',async(req,res)=>{
    try{
        const prod=req.params.product

        if(prod=="Burger"||prod=="Shawarma"||prod=="Pizza"||prod=="Cake")
        {
    
        const resp=await Customer.find({product:prod})
    
        res.status(200).json(resp)
       }
       else
       {
        res.status(404).json({error:"Invalid Product"})
       }
    }
    catch(err)
    {

        console.log(err)
        res.status(500).json({error:'Internal Server Error'})

    }
})

router.put('/:id',async(req,res)=>{
    try{
      const id=req.params.id
      const updatedinfo=req.body
  
      const data= await Customer.findByIdAndUpdate(id,updatedinfo,{
        new:true,
        runValidators:true
      })
  
      console.log("Data updated")
  
      if(!data)
      {
        return res.status(404).json({error:"Invalid Customer Id"}) 
      }
  
      res.status(200).json(data)
  
    }
    catch(err)
    {
      console.log(err)
      res.status(500).json({error:'Internal Server Error'})
    }
  
    })

    router.delete('/:id',async(req,res)=>{
   
        try{
             
        const Customtobedelete=req.params.id
    
        const resp=await Customer.findByIdAndDelete(Customtobedelete)
    
        if(!resp)
        {
          return res.status(404).json({error:"Invalid Customer Id"})
        }
       
    
        res.status(200).json("Customer Deleted Successfully")
    
        }
        catch(err)
        {
          console.log(err)
          res.status(500).json({error:'Internal Server Error'})
        }
    
      })

module.exports=router;

