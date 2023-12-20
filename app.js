// import required libraries/dependencies
import express from 'express'; // import express library
import path from 'path'; // idk what this is shouldn't need this
import pg from 'pg'; // import pg library
const { Pool } = pg; // idk what this is
const app = express(); // set my server to use express?
const expressPort = 8004; // set port to 8004
const pool = new Pool({ // not sure what this is all for...
    user: "matthewslonoff", // my user
    password: 'slonoff4', // my user password
    host: 'localhost', // my host, setting to default
    database: 'cardb', // my database
    port: 5432, // this is the default port of something...?
});
app.use(express.json()); // this middleware is required for the post!!
app.use(express.static('public')); // middleware that will load all files in folder onto webpage

// Create CRUD Routes for a single resource
app.get('/api/cars', (req, res) => {
    pool
    .query('SELECT * FROM cardata')
    .then((result) => res.status(201).send(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry your database not found');
    });
});

app.get('/api/owners', (req, res) => {
    pool
    .query('SELECT * FROM owners')
    .then((result) => res.send(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry your database not found');
    });
});

app.get('/api/owners:id', (req, res) => {
    const { id } = req.params.id;
    pool.query('SELECT * FROM owners WHERE id = $1', [id])
    .then((result) => {
            res.status(200).send(result.rows)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Sorry owner not found');
        });
});

// post
app.post('/api/owners', (req, res) => { // this works
    let { first_name, last_name } = req.body;
    let queryParams = [first_name, last_name];
    pool.query('INSERT INTO owners (first_name, last_name) VALUES ($1, $2)', queryParams)
    .then((result) => res.send('New Owner Added!'))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry, cannot add new owner.');
    });
});

app.post('/api/carData', async (req, res) => {
    try {
    const { car_make, car_model, color, mileage, car_model_year, owner_id } = req.body;
    const newCar = await pool.query('INSERT INTO owners (car_make, car_model, color, mileage, car_model_year, owner_id) VALUES ($1, $2, $3, $4, $5, $6)', [car_make, car_model, color, mileage, car_model_year, owner_id])
    res.status(201).send('New car Added!')
    } catch(error) {
        console.error(error);
        res.status(500).send('Sorry, cannot add new car.');
    };
});

// Create new post
// app.post("/posts", async (req, res) => {
//     try {
//       const { post_title, post_author, post_date, post_new } = req.body;
//       const newPost = await pool.query(
//         "INSERT INTO posts (post_title, post_author, post_date, post_new) VALUES ($1, $2, $3, $4)",
//         [post_title, post_author, post_date, post_new]
//       );
//       res.status(201).send("New post created!");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       res.status(500).json({ error: "Error creating post" });
//     }
//   });

// patch 


// delete



app.listen(expressPort, () => {
    console.log(`Listening on port ${expressPort}...`)
})