const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { client } = require('../Utilis/db.config')

const reviewProfilesCollection = client.db('coderAccess').collection('revirewProfile')

const addReviewProfileController = async (req, res) => {
    const reviewProfile = req.body;
    const result = await reviewProfilesCollection.insertOne(reviewProfile);
    res.send(result)
 }

 module.exports = {addReviewProfileController}