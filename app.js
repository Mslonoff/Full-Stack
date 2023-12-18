import express from 'express';
import path from 'path';

const app = express();

const expressPort = 8004;

app.use(express.static('public')); // middleware that will load all files in folder onto webpage

// app.get('/pets', (req, res) => {
//     res.send(petData);
// })

app.listen(expressPort, () => {
    console.log(`Listening on port ${expressPort}...`)
})