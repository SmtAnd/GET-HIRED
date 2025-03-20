const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000;
require('dotenv').config()


require('dotenv').config()
// console.log(process.env.DB_USER) 
// console.log(process.env.DB_PASSWORD) 

// Middleware
app.use(express.json())
app.use(cors())

// user: sumitanand03
// pswd: sumit321 


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal.pbqk1za.mongodb.net/?retryWrites=true&w=majority`;

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

    // create database
    const db = client.db("GetHired");
    const jobscollections = db.collection("jobListings");

    // post a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      // console.log(body);
      const result = await jobscollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert try again later",
          status: false
        })
      }
    })

    // get all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobscollections.find({}).toArray()
      res.send(jobs);
    })

    // Get single Jobs by using id
    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobscollections.findOne({
        _id: new ObjectId(id)
      })
      res.send(job)

    })

    // get jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      // console.log(req.params.email);
      const jobs = await jobscollections.find({ postedBy: req.params.email }).toArray();
      res.send(jobs);
    })

    // Delete a job 
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const result = await jobscollections.deleteOne(filter);
      res.send(result)
    })

    // update a job
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...jobData
        },
      };

      const result = await jobscollections.updateOne(filter, updateDoc, options);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Developer!')
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })