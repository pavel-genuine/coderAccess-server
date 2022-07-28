const express = require('express');
const cors = require('cors');
const http = require('http');
const { profileRouter } = require('./src/routes/profiles.router');
require('dotenv').config();

const port = process.env.PORT || 5000
const app = express();

app.use(cors());
app.use(express.json());

app.use('/profile', profileRouter);


const expressServer = http.createServer(app)


expressServer.listen(port,()=>{
    console.log('running exserver',port);
})


app.get('/', (req, res) => {
    res.send('server running')
});
