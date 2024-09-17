const express=require('express')
const router=express.Router()
const menuitem=require('../models/menu')




router.post('/',async (req,res)=>{

    try{
    const data=req.body
  
    const newitem=new menuitem(data)
  
    const response=await newitem.save()
  
    console.log('Data Saved')
  
    res.status(200).json(response)
    }catch(err)
    {
       console.log(err)
       res.status(500).json({error:'Internal Server Error'})
    }
  })
  
  router.get('/', async(req,res)=>{
    try{
        const data = await menuitem.find()
  
        console.log('Data fetched')
  
      res.status(200).json(data)
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:'Internal Server Error'})
    }
  })


  router.get('/:menutype', async(req,res)=>{
    try{
        const menutype=req.params.menutype
        
        if(menutype=="Spicy"||menutype=="Sour"||menutype=="Sweet")
        {
        const data = await menuitem.find({taste:menutype})
  
        console.log('Data fetched')
  
      res.status(200).json(data)
    }
    else{
        res.status(404).json({error:"Invalid TasteType"})
    }
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:'Internal Server Error'})
    }
  })


  router.put('/:id',async(req,res)=>{
    try{
      const id=req.params.id
      const updatedinfo=req.body
  
      const data= await menuitem.findByIdAndUpdate(id,updatedinfo,{
        new:true,
        runValidators:true
      })
  
      console.log("Data updated")
  
      if(!data)
      {
        return res.status(404).json({error:"Invalid MenuItem Id"}) 
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
           
      const Itemtobedelete=req.params.id
  
      const resp=await menuitem.findByIdAndDelete(Itemtobedelete)
  
      if(!resp)
      {
        return res.status(404).json({error:"Invalid Item Id"})
      }
     
  
      res.status(200).json("Item Deleted Successfully")
  
      }
      catch(err)
      {
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
      }
  
    })
//Commit added to the persons and we get all
  module.exports=router