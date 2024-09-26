const passport=require('passport')
const LocalStratergy=require('passport-local').Strategy //Username and password strategy
const person=require('./models/person')

passport.use(new LocalStratergy(async (USER,PWD,done)=>{
    //Authentication process
  try {
    const user= await person.findOne({username:USER})
    if(!user)
      return done(null,false,{message:"Incorrect Username (cannot give access)"})

    const ispass=await user.comparepass(PWD)
    if(ispass)
      return done(null,user)
    else
    {
      return done(null,false,{message:"Incorrect Password (cannot give access)"})
    }
  } catch (error) {
    return done(error)
  }
}))

module.exports=passport