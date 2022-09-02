const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { client } = require('../Utilis/db.config')

const forumCollection = client.db('coderAccess').collection('forum')

const getAllForumController = async (req, res) => {
   const query = {}
   const cursor = forumCollection.find(query)
   const allforum = await cursor.toArray()
   res?.send(allforum)
}

const addForumController = async (req, res) => {
   const data = req.body;
   const result = await forumCollection.insertOne(data);
   res.send(result)
}

const getSingleForumController = async (req, res) => {
   const id = req?.params?.id;
   const query = { _id: ObjectId(id) };
   const data= await forumCollection.findOne(query)
   res.send(data)
}


const updateForumController = async (req, res) => {
    const id = req?.params?.id;
   const data = req?.body;
   const filter = { _id: ObjectId(id) };
   const updatedDoc = {
      $set: blog
   };
   const result = await forumCollection?.updateOne(filter,updatedDoc);
   
   res.send(result);
}

const deleteForumController = async (req, res) => {
   const id = req.params.id;
   const query = { _id: ObjectId(id) };
   const result = await forumCollection.deleteOne(query);
   res.send(result);
}
module.exports = {getAllForumController, addForumController, getSingleForumController, updateForumController, deleteForumController }