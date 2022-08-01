const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const {client} = require('../Utilis/db.config')

const profilesCollection = client.db('coderAccess').collection('profiles')

const getAllProfilesController = async (req, res) => {
   const query = {}
   const cursor = profilesCollection.find(query)
   const allProfiless = await cursor.toArray()
   res?.send(allProfiless)
}

const addProfileController = async (req, res) => {
   const profile = req.body;
   const result = await profilesCollection.insertOne(profile);
   res.send(result)
}

const getSingleProfileController = async (req, res) => {
   const id = req.params.id
   const query = { _id: ObjectId(id) }
   const singleProfile = await profilesCollection.findOne(query)
   res.send(singleProfile)
}


const updateProfileController = async (req, res) => {
   const email = req.params.email;
   const user = req.body;
   const filter = { email: email };
   const options = { upsert: true };

   const updatedDoc = {
       $set:user
   };
   const result = await profilesCollection.updateOne(filter, updatedDoc,options);
   res.send(result);

}

const deleteProfileController = async (req, res) => {
   const id = req.params.id;
   const query = { _id: ObjectId(id) };
   const result = await profilesCollection.deleteOne(query);
   res.send(result);
}
module.exports={getAllProfilesController, addProfileController, getSingleProfileController, updateProfileController, deleteProfileController }