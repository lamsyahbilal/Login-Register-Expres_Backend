import express from 'express'
import bcypt from 'bcrypt'

const app=express()
const port=3000
const users=[]//use it as a memory to store all user register
app.use(express.json())//is a built-in middelware in express that is used for
                        //parssing incomming requists with json payload

       
app.post("/register",async(req,res)=>{
    try {
        const {email, password}=req.body;
        //find ueser in array
        const finduser= users.find((data)=>email == data.email);
        if(finduser){
            res.status(400).send("worng email or password!")
        }
        //hash passsword
        const hashpassword = await bcypt.hash(password, 10);
        users.push({email,password: hashpassword});
        console.log(users)
        res.status(201).send("registred seccessfuly");
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

app.post("/login",async (req,res)=>{
    try {
        const {email, password}= req.body
        //find user
        const finduser=users.find((data)=> email == data.email)
        if (!finduser) {
            res.status(400).send("wrong email or password")
        }
        const passwrdmatch = await bcypt.compare(password, finduser.password)
        if(passwrdmatch){
            res.status(201).send("logged in succesfoly!")
        }else{
            res.status(400).send("wrong email or password")
        }
    } catch (error) {
        res.status(500).send({message:error.message});
        }
    
})
app.listen(port,()=>{
    console.log("server is runing in port 3000")
})