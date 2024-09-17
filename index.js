// console.log("Welcome to pakistan")

// function add(a,b)
// {
//     return a+b
// }

// let result = add(3,6)
// console.log(result)

// var fs=require('fs')
// var os=require('os')

// var user=os.userInfo()

// console.log(user.username)

// fs.appendFile('greeting.txt','Hi '+user.username+' ! \n',()=>{
//     console.log("File has been created")
// })

// var sample=require('./sample1.js')
// var _=require('lodash')

// var myage=sample.age

// console.log("Age is "+myage)

// console.log(sample.add(4,6))

// const person=['ali','faizan','shakir','ali','shakir']

// console.log(_.uniq(person))

// console.log(_.isArray(person))

// var string1=`{"name":"John","age":25,"address":"abc"}`
// var obj=JSON.parse(string1)

// console.log(obj.age)

// var obj1={"name":"John","age":25,"address":"abc"}
// var string2=JSON.stringify(obj1)

// console.log(string2)

const express = require('express')
const app = express()
const db=require('./db')
const bodyParser=require('body-parser')
app.use(bodyParser.json())

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hey I am your waiter to serve you please tell me about your choice')
})

const personRoutes=require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes')
const customerRoutes=require('./routes/customerRoutes')

app.use('/person',personRoutes)
app.use('/menu',menuRoutes)
app.use('/customer',customerRoutes)

app.listen(3000,()=>{
    console.log("Server is listening on 3000")
})