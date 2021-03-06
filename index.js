const cors = require("cors");
const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
// assignment-11
// PVfaGVHKKjfv3lZS
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dgoei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    const database = client.db("DELIVERY")
    const Servicecollections=database.collection("services");
    const Bookingcollection = database.collection('mybooking')
    

// -------------------post-------

app.post('/addservice', async(req,res)=>{
   
    const result = await  Servicecollections.insertOne(req.body)
    res.send(result)
})

// ----------------------get--------
app.get('/getservice', async(req,res)=>{
    const result = await Servicecollections.find({}).toArray()
    res.send(result)

})
// --------------------post for booking-----------
app.post('/mybooking',async(req,res)=>{
    console.log(req.body);
    const result = await  Bookingcollection.insertOne(req.body)
    res.send(result)
})
app.get('/findbooking/:email', async(req,res)=>{
   
    const result =  await Bookingcollection.find({email:req.params.email}).toArray()
    res.send(result)
})
// -----------------all booking------------------
app.get('/allbooking', async(req,res)=>{
    const result = await Bookingcollection.find({}).toArray()
    res.send(result)

})

// delete booking
app.delete('/delete/:id', async(req,res)=>{
      const query = req.params.id
    const result = await Bookingcollection.deleteOne({_id:ObjectId(query)})
    res.send(result)
})
// -------------------single---------
app.get('/single/:id', async(req,res)=>{
    console.log(req.params.id);
    const result = await Servicecollections.findOne({_id:ObjectId(req.params.id)})
    res.send(result)
})

console.log("database");
app.put('/update/:id',async(req,res)=>{
    const options = { upsert: true };
    // const updateuser = req.body
    // const status = 'approved'

    console.log(req.body);
    const id= req.params.id
    console.log(id);
    const filter = {_id:ObjectId(id)}
    
    const updateDoc = {
        $set: {
         status: 'approved',
        
        },
      };
      const result = await Bookingcollection.updateOne(filter,updateDoc,options)
   console.log("updating",id);
    res.send(result)
})
})
// bookinng single get
// app.get('/single:id',async(req,res)=>{
//     const result = await Bookingcollection.findOne({_id:ObjectId(req.params.id)})
//     res.send(result)
// })
// ----------------------put method----------------


// --------------------------------------------end-----
app.get('/',(req,res)=>{
    res.send('connceted')
})
  app.listen(port,{})

  
