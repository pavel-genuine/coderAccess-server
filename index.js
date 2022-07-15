const { client } = require('./controllers/promo.controllers');
const { promoRouter } = require('./routes/promo.router');



const express = require('express');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());


const http = require('http');
const { Server } = require('socket.io');
const expressServer = http.createServer(app)




const io = new Server(expressServer
//     ,{
//     cors :{
//         origin:"http://localhost:3000/",
//         methods:["GET","POST"]
//     }
// }
);





io.on("connection", (socket) => {
    console.log(`connected io : ${socket.id}`);
});
io.on("disconnect", () => {
    console.log(`connected io not `);
});



expressServer.listen(port,()=>{
    console.log('running exserver',port);
})


// client.connect()

// app.use('/promo', promoRouter)



app.get('/ex', (req, res) => {
    res.send('server running')
});

// app.listen(port, () => {
//     console.log('listening', port);
// });

