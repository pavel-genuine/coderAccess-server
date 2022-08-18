const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = 5000 || process.env.PORT;
app.use(cors());
app.use(express.json());
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*", } });
io.on('connection', (socket) => {
    console.log("what is socket : " + socket);
    console.log("actice socket io");
    socket.on("chat", (payload) => {
        console.log("payload = ", payload)
        
       io.emit("chat", payload)
  
    })
})

server.listen(5000, () => {
    console.log("server is listen in port in 5000...")
})

// app.listen(port, () => {
//     console.log('listening to port ', port);
// })




const uri = "mongodb+srv://coderAccess:d64VFIiAegQTPsYD@cluster0.23ofj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err=>{
//     client.db("coderAccess").collection('profiles');
//     console.log("DB connected")

// })
async function run() {
    try {
        await client.connect();
        const challenge = client.db("coderAccess").collection('challenges');
        //   const profile = client.db("coderAccess").collection('profiles');
        const Algorithim = client.db("coderAccess").collection('Algorithim');
        const Database = client.db("coderAccess").collection('Database');
        const DS = client.db("coderAccess").collection('DS');

        const problem = { title: "Sum of array " };
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

app.get('/', (req, res) => {
    res.send('hello')
})
