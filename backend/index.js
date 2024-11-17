const dotenv = require('dotenv');
const { Client } = require("pg");
  dotenv.config();
const client = new Client({connectionString: process.env.PGURI});
client.connect();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));


// CRUD //
//                     create
app.post("/planer", async (req, res) => {
  try {
    const {beskrivning} = req.body;
    const nyaPlaner = await pool.query("INSERT INTO planer (beskrivning) VALUES($1) RETURNING *",[beskrivning]
    );

    res.json(nyaPlaner.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//                       get
app.get("/planer/", async (req, res) => {
  try {
    const allaPlaner = await pool.query("SELECT * FROM planer");
    res.json(allaPlaner.rows);
} catch (error) {
  console.error(error.message);
  }
});

//                       get id
// app.get("/planer/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const planer = await pool.query("SELECT * FROM planer WHERE planer_id = $1", [ id ]);
//     res.json(planer.rows[0]);
// } catch (error) {
//   console.error(error.message);
//   }
// });

//                      update
app.put("/planer/:id", async (req, res) => {
  try {
    const { id } = req.params.id;
    const { beskrivning } = req.body;
    const updatePlaner = await pool.query("UPDATE planer SET beskrivning = $1 WHERE id = $2", [beskrivning, id]);

    res.json("Planer har uppdaterats")
  } catch (error) {
    console.error(error.message);
    }
  });

//                      delete
app.delete("/planer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePlaner = await pool.query("DELETE FROM planer WHERE id = $1", [ id ]);
    res.json("Planer har raderats")
} catch (error) {
  console.error(error.message);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}`)
})
