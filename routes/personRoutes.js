const express=require('express')
const router = express.Router();
const person=require('../models/person')
const {jwtAuthMiddleware,generateToken}=require('../jwt')

//POST route to add a person
router.post('/signup',async (req,res)=>{
    //    const data=req.body // We using body parser which converts our data in json format and store that data in req.body
    //    const newperson=new person(data);
    //    newperson.name=data.name;
    //    newperson.age=data.age;
    //    newperson.work=data.work;
    //    newperson.address=data.address;
    //    newperson.mobile=data.mobile;
    //    newperson.email=data.email;
    //    newperson.salary=data.salary;

    //save newperson to database
    // newperson.save((error, savedperson)=>{
    //     if(error)
    //     {
    //         console.log("Error saving person : ",error)
    //         res.status(500).json({error:'Internal Server Error'})
    //     }
    //     else 
    //     {
    //        console.log("Data saved suuccessfully")
    //        res.status(200).json(savedperson)
    //     }
    // })

    try{
    const data=req.body

    const newperson=new person(data)

    const response=await newperson.save()

    console.log('Data Saved')
    
    const payload={
      id:response.id,
      username:response.username
    }

    const token=generateToken(payload)
    console.log("Token is : ",token)

    res.status(200).json({response:response,token:token})
    }catch(err)
    {
       console.log(err)
       res.status(500).json({error:'Internal Server Error'})
    }
})

router.post('/login',async(req,res)=>{
  try {
    const {username,password}=req.body;
    
    const user=await person.findOne({username:username})
    
    if(!user)
    {
      res.status(500).json({error:"Invalid Username"})
      return
    }

    const ispass=await user.comparepass(password)

    if(!ispass)
    {
      res.status(500).json({error:"Invalid Password"})
      return
    }

    const payload={
      id:user.id,
      username:user.username
    }

    const token=generateToken(payload)

    res.json({token})



  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server Error'})
  }
})


router.get('/', jwtAuthMiddleware, async(req,res)=>{
    try{
        const data = await person.find()
  
        console.log('Data fetched')
  
      res.status(200).json(data)
    }
    catch(err){
      console.log(err)
      res.status(500).json({error:'Internal Server Error'})
    }
  })

router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
  try{
    const userdata=req.user

    console.log(userdata)

    const userid=userdata.id

    const user=await person.findById(userid)

    res.status(200).json({user})
  }
  catch(err)
  {
    console.log(err)
    res.status(500).json({error:"Internal Error"})
  }
})

  router.get('/:worktype',async (req,res)=>{
    try{
           const worktype=req.params.worktype
           if(worktype=="chef"||worktype=="waiter"||worktype=="manager")
           {
            const response=await person.find({work:worktype})
            console.log('Data fetched')
  
            res.status(200).json(response)
           }
           else{
            res.status(404).json({error:"Invalid Work type"})
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

    const data= await person.findByIdAndUpdate(id,updatedinfo,{
      new:true,
      runValidators:true
    })

    console.log("Data updated")

    if(!data)
    {
      return res.status(404).json({error:"Invalid Person Id"}) 
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
         
    const persontobedelete=req.params.id

    const resp=await person.findByIdAndDelete(persontobedelete)

    if(!resp)
    {
      return res.status(404).json({error:"Invalid Person Id"})
    }
   

    res.status(200).json("Person Deleted Successfully")

    }
    catch(err)
    {
      console.log(err)
      res.status(500).json({error:'Internal Server Error'})
    }

  })

  module.exports=router