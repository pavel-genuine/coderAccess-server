
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());


const http = require('http');
const expressServer = http.createServer(app)


expressServer.listen(port,()=>{
    console.log('running exserver',port);
})


app.get('/', (req, res) => {
    res.send('server running')
});

