// import required libraries/dependencies
import express from 'express'; // import express library
import path from 'path'; // idk what this is shouldn't need this
import pg from 'pg'; // import pg library
const { Pool } = pg; // idk what this is
const app = express(); // set my server to use express?
const expressPort = 8003; // set port to 8004
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
app.get('/api/carData', (req, res) => { // this works
    pool
    .query('SELECT * FROM cardata')
    .then((result) => res.status(201).send(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry your database not found');
    });
});

app.get('/api/owners', (req, res) => { // this works
    pool
    .query('SELECT * FROM owners')
    .then((result) => res.send(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry your database not found');
    });
});

app.get('/api/owners/:id', (req, res) => { // this works
    const { id } = req.params;
    pool.query('SELECT * FROM owners WHERE id = $1', [id])
    .then((result) => {
        if (result.rows.length > 0) {
            res.status(200).send(result.rows)
        } else {
            res.status(404).send('Sorry owner not found');
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

app.get('/api/carData/:id', (req, res) => { // this works
    const { id } = req.params;
    pool.query('SELECT * FROM carData WHERE car_id = $1', [id])
    .then((result) => {
        if (result.rows.length > 0) {
            res.status(200).send(result.rows)
        } else {
            res.status(404).send('Sorry carData not found');
        }
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
});

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

app.post('/api/carData', (req, res) => { // this works
    let { car_make, car_model, car_model_year, color, mileage, owner_id } = req.body;
    let queryParams = [car_make, car_model, car_model_year, color, mileage, owner_id];
    pool.query('INSERT INTO carData (car_make, car_model, car_model_year, color, mileage, owner_id) VALUES ($1, $2, $3, $4, $5, $6)', queryParams)
    .then((result) => res.send('New car Added!'))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Sorry, cannot add new car.');
    });
});

app.listen(expressPort, () => {
    console.log(`Listening on port ${expressPort}...`)
})

// put (update EVERY input of an object) OR patch (update 1)
// doing patch
app.patch('/api/owners/:id', (req, res) => { // this works, but it moves the position of the owner to be updated
    const { id } = req.params;
    let { first_name } = req.body;
    pool.query('UPDATE owners SET first_name=$1 WHERE id = $2', [first_name, id])
    .then((result) => res.status(200).send('Owner first name updated!'))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error - failed to update first name');
    });
});

// delete (delete 1 by an id)
app.delete('/api/owners/:id', (req, res) => { // this works
    const { id } = req.params;
    pool.query('DELETE FROM owners WHERE id = $1', [id])
    .then((result) => res.status(200).send('Owner deleted!'))
    .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error - failed to delete owner');
    });
});

// Create new post, Autumn's code example
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





