const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


const uri = "mongodb+srv://coderAccess:d64VFIiAegQTPsYD@cluster0.23ofj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = {client}