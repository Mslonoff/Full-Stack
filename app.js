import express from 'express';
import path from 'path';
import pg from 'pg';
const { Pool } = pg;
const app = express();
const expressPort = 8004;
const pool = new Pool({
    user: "matthewslonoff",
    password: 'slonoff4',
    host: 'localhost',
    database: 'carsdb',
    port: 5432,
});
// app.use(express.json()); // do we need this? probably not
app.use(express.static('public')); // middleware that will load all files in folder onto webpage

// app.get('/pets', (req, res) => {
//     res.send(petData);
// })

app.listen(expressPort, () => {
    console.log(`Listening on port ${expressPort}...`)
})