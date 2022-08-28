const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { client } = require('../Utilis/db.config')

const submissionsCollection = client.db('coderAccess').collection('submissions')

const getAllSubmissionsController = async (req, res) => {
   const query = {}
   const cursor = submissionsCollection.find(query)
   const allSubmissions = await cursor.toArray()
   res?.send(allSubmissions)
}

const addSubmissionController = async (req, res) => {
   const data = req.body;
   const result = await submissionsCollection.insertOne(data);
   res.send(result)
}

const getSingleSubmissionController = async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const data = await submissionsCollection.findOne(query)
    res.send(data)
}


const updatSubmissionController = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updatedDoc = {
       $set: data
    };
    const result = await submissionsCollection.updateOne(filter, updatedDoc,options);
    res.send(result);
}

// const updateProfileController = async (req, res) => {
//     const email = req.params.email;
//     const user = req.body;
//     const filter = { email: email };
//     const options = { upsert: true };
 
//     const updatedDoc = {
//        $set: user
//     };
//     const result = await profilesCollection.updateOne(filter, updatedDoc, options);
//     res.send(result);
 
//  }

const deleteSubmissionController = async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await submissionsCollection.deleteOne(query);
    res.send(result);
}
module.exports = { getAllSubmissionsController, addSubmissionController, getSingleSubmissionController, updatSubmissionController, deleteSubmissionController }