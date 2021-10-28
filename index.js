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

const uri = `mongodb+srv://${process.envDB_USER}:${process.env.DB_PASS}@cluster0.dgoei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    const database = client.db("ASSIGNMENT-11")
    const collections=database.collection("services");
    

// -------------------
console.log("database");
})

app.get('/',(req,res)=>{
    res.send('connceted')
})
  app.listen(port,{})

  
