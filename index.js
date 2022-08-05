const express = require('express');
const cors = require('cors');
const http = require('http');

const { profileRouter } = require('./src/routes/profiles.router');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { client } = require('./src/Utilis/db.config')

require('dotenv').config();

const port = process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());

app.use('/profiles', profileRouter);


const expressServer = http.createServer(app)


expressServer.listen(port, () => {
    console.log('running exserver', port);
})


app.get('/', (req, res) => {
    res.send('server running')
});





async function run() {
    try {
        await client.connect();
        const challenge = client.db("coderAccess").collection('challenges');
        //   const profile = client.db("coderAccess").collection('profiles');
        const Algorithim = client.db("coderAccess").collection('Algorithim');
        const Database = client.db("coderAccess").collection('Database');
        const DS = client.db("coderAccess").collection('DS');

        const problem = { title: "Sum of array " };
        // const result = await challenge.insertOne(problem)
        //app.get()
        // console.log("Insert")



        // app.post('/uploadproblem', async (req, res) => {
        //     const data = req?.body;
        //     console.log(data);
        //     const result = await challenge.insertOne(data)
        //     console.log(result);
        //      res.send({status:"done"})
        // });


        app.get('/challengeHard', async (req, res) => {
            const query = { type: 'Hard' };
            const corsur = challenge.find(query)
            const result = await corsur.toArray()
            console.log(result);
            res.send(result);
        });
        app.get('/challengeEasy', async (req, res) => {
            const query = { type: 'Easy' };
            const corsur = challenge.find(query)
            const result = await corsur.toArray()
            console.log(result);
            res.send(result);
        });



        app.post('/Database', async (req, res) => {
            const data = req?.body;
            console.log(data);
            const result = await Database.insertOne(data)
            console.log(result);
            res.send({ status: "done" })
        });


        app.post('/Algorithim', async (req, res) => {
            const data = req?.body;
            console.log(data);
            const result = await Algorithim.insertOne(data)
            console.log(result);
            res.send({ status: "done" })
        });



        app.post('/DS', async (req, res) => {
            const data = req?.body;
            console.log(data);
            const result = await DS.insertOne(data)
            console.log(result);
            res.send({ status: "done" })
        });


        app.get('/TopicAlgo', async (req, res) => {
            const query = {}
            const corsur = Algorithim.find(query)
            const result = await corsur.toArray();
            res.send(result);
        })
        app.get('/TopicDS', async (req, res) => {
            const query = {}
            const corsur = DS.find(query)
            const result = await corsur.toArray();
            res.send(result);
        })
        app.get('/TopicDatabase', async (req, res) => {
            const query = {}
            const corsur = Database.find(query)
            const result = await corsur.toArray();
            res.send(result);
        })



    }
    finally {

    }
}
run().catch(console.dir)










app.get('/uploadproblem', (req, res) => {
    res.send("Connected");
})


app.get('/', (req, res) => {
    res.send('hello')
})


// app.listen(port, () => {
//     console.log('listening to port ', port);
// })