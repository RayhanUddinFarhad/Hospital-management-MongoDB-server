const express = require('express');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use (express.json())
app.use  (cors())




const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.edrit7p.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("HealingHandsManage");
    const doctors = database.collection("doctors");





    app.get ('/doctors', async (req, res) => {

        const cursor = doctors.find();
        const doctor = await  cursor.toArray();


        res.send (doctor)





        
     })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {

    res.send ('Welcome to doctor')


})

app.listen (port, (req, res) => {


    console.log (`listening on ${port}`)
 })