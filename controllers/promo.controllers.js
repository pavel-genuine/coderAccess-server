const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://joynulabedin:q5pxxcPPcltl82v4@cluster0.vot6n.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const promosCollection = client.db('promo-offer').collection('promo')

 const getAllPromoControllers = async (req, res) => {
    const query = {}
    const cursor = promosCollection.find(query)
    const allPromos = await cursor.toArray()
    res.send(allPromos)
}


 const addPromoController = async (req, res) => {
    const promo = req.body;
    const result = await promosCollection.insertOne(promo);
    res.send(result)
}

 const getSinglePromoController = async (req, res) => {
    const id = req.params.id
    const query = { _id: ObjectId(id) }
    const singlePromo = await promosCollection.findOne(query)
    res.send(singlePromo)
}


const updatePromoController = async (req, res) => {
    const id = req.params.id;
    const promo = req.body;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: true };
    const updatedDoc = {
        $set: {
            title: promo.title,
            discount: promo.discount,
            price: promo.price,

        }
    };
    const result = await promosCollection.updateOne(filter, updatedDoc, options);
    res.send(result);

}

const deletePromoController = async (req, res) => {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await promosCollection.deleteOne(query);
    res.send(result);
}
module.exports={ client, getAllPromoControllers, addPromoController, getSinglePromoController, updatePromoController, deletePromoController }