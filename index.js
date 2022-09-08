const express = require('express');
const cors = require('cors');
const http = require('http');
const stripe = require('stripe')('sk_test_51L2gBjKKjNuPS9hlwFEM3UP6GHbMiIEfgCLuVyeHiHbkPO8W2UmVMzXIh7GXcNlwUPK7fZBB4teC97xv1C14p1Iy00735W0S6x');
const { profileRouter } = require('./src/routes/profiles.router');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { client } = require('./src/Utilis/db.config')

const { reviewProfileRouter } = require('./src/routes/reviewProfile.router');
const { courseRouter } = require('./src/routes/courses.router');
const { blogRouter } = require('./src/routes/blogs.router');
const { submissionsRouter } = require('./src/routes/submissions.router');
const { forumRouter } = require('./src/routes/forum.router');

require('dotenv').config();

const port = process.env.PORT || 5000
const app = express();



app.use(cors());
app.use(express.json());

app.use('/profiles', profileRouter);
app.use('/blogs', blogRouter);
app.use('/forum', forumRouter);
app.use('/reviewProfile', reviewProfileRouter);
app.use('/courses', courseRouter);
app.use('/submissions', submissionsRouter);

const expressServer = http.createServer(app)

const io = require('socket.io')(expressServer, { cors: { origin: "*", } });
io.on('connection', (socket) => {
    console.log("what is socket : " + socket);
    console.log("actice socket io");
    socket.on("chat", (payload) => {
        console.log("payload = ", payload)

        io.emit("chat", payload)

    })
})


expressServer.listen(port, () => {
    console.log('running exserver', port);
})


app.get('/', (req, res) => {
    res.send('coderAccess exp server running')
});

async function run() {
    try {
        await client.connect();
        const challenge = client.db("coderAccess").collection('challenges');

        const Algorithim = client.db("coderAccess").collection('Algorithim');
        const Database = client.db("coderAccess").collection('Database');
        const DS = client.db("coderAccess").collection('DS');
        const Addtocart = client.db("coderAccess").collection('Addtocart');

        app.post('/create-payment-intent', async (req, res) => {
            const service = req.body;
            const price = service.totalPrice;
            const amount = price * 100;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'bdt',
                payment_method_types: ['card']
            });
            // console.log('ppp',paymentIntent.client_secret);
            res.send({ clientSecret: paymentIntent.client_secret })
        });


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



        app.get('/TopicAlgo/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await Algorithim.findOne(query)
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

        app.post('/getaddcard', async (req, res) => {
            const email = req.body.email;
            // console.log(email);
            const querry = { email }
            const cursor = Addtocart.find(querry);
            const result = await cursor.toArray();
            res.send(result);

        })


        app.get('/additemsview/:email', async (req, res) => {
            const email = req.params.email;
            const querry = { email };
            const coursor = Addtocart.find(querry);
            const result = await coursor.toArray();
            res.send(result);

        })
        app.post('/check', async (req, res) => {
            // const cursor =await Addtocart.insertOne(req.body);
            const id = req.body.id;
            const email = req.body.email;
            const course = req.body.course;
            const data = { id, email, course }
            const querry = { id, email };
            const coursor = await Addtocart.findOne(querry);
            if (coursor) {
                console.log("this is not null value so value is exist")
                res.send({ message: false });
            }
            else {
                const result = Addtocart.insertOne(data);
                console.log(result)
                console.log("this is null value and value is inserted ");
                res.send({ message: true });
            }


            console.log(coursor);


        })

        app.delete('/additemsview/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const querry = { _id: ObjectId(id) }
            const result = await Addtocart.deleteOne(querry);
            res.send(result);

        })



    }
    finally {

    }
}
run().catch(console.dir)


process.on('uncaughtExceptionMonitor', (err) => {
    console.log(err.name, err.message);
    app.close(() => {
        process.exit(1)
    })
})
