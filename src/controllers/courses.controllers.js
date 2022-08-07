const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const {client} = require('../Utilis/db.config')

const coursesCollection = client.db('coderAccess').collection('courses')

const getAllCouresController = async (req, res) => {
   const query = {}
   const cursor = coursesCollection.find(query)
   const allCourses = await cursor.toArray()
  
   res?.send(allCourses)


}


const addCourseController = async (req, res) => {
   const promo = req.body;
   const result = await coursesCollection.insertOne(promo);
   res.send(result)
}

const getSingleCourseController = async (req, res) => {
   const id = req.params.id
   const query = { _id: ObjectId(id) }
   const singleCourse = await coursesCollection.findOne(query)
   res.send(singleCourse)
}


const updateCourseController = async (req, res) => {
   const id = req.params.id;
   const promo = req.body;
   const filter = { _id: ObjectId(id) };
   const options = { upsert: true };
   const updatedDoc = {
       $set: {
          

       }
   };
   const result = await coursesCollection.updateOne(filter, updatedDoc, options);
   res.send(result);

}

const deleteCourseController = async (req, res) => {
   const id = req.params.id;
   const query = { _id: ObjectId(id) };
   const result = await coursesCollection.deleteOne(query);
   res.send(result);
}
module.exports={getAllCouresController, addProfileController: addCourseController, getSingleProfileController: getSingleCourseController, updateCourseController, deleteCourseController }