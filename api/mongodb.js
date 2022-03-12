
const express = require("express");
const router = express.Router();
require('dotenv').config()

// mongodb+srv://rayjlim1:<password>@cluster0.5lnch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@${process.env.mongo_host}/`;



/**
 * GET product list.
 *
 * @return product list | empty.
 */
router.get("/", async (req, res) => {

  try {
    console.log("start mongo");
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    // console.log(client)
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // console.log(collection)

        collection.find({}).toArray( (err, result) =>{
            if (err) throw err;
            // console.log(result);
            console.log('mongodb got result')
            client.close();
            return res.json(result);
          });

      });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;