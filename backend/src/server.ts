import express, { Request, Response } from 'express';

const app = express();
const cors = require('cors');

const port = 3000;

app.use(express.json())
app.use(cors());

const item: string = "teddst"

// Should see this in localhost:3000 (since root url)
// GET retrieves data FROM the server
app.get('/', (req, res) => {
  res.json({ item })
});

app.get('/api/tasks', (req, res) => {
    res.json(require('./data/tasks.json'));
});

// POST creates new data ON the server
app.post('/api/items', (req, res) => {
  // Logic to add a new item
  // Use req.body to access posted data
  console.log(req.body);
  res.status(201).send('Item created');
});

// PUT updates existing data on server ENTIRELY
app.put('/api/items/:id', (req, res) => {
  // Logic to update an item ENTIRELY
  // Access the item id with req.params.id
  res.send(`Item ${req.params.id} updated`);
});

// PATCH updates existing data on server PARTIALLY
app.patch('/api/items/:id', (req, res) => {
  // Logic to partially update an item
  res.send(`Item ${req.params.id} partially updated`);
});

// DELETE deletes data from the server
app.delete('/api/items/:id', (req, res) => {
  // Logic to delete an item
  res.send(`Item ${req.params.id} deleted`);
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});