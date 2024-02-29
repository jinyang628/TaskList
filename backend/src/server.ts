import 'dotenv/config';

import express, { Request, Response } from 'express';
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const fs = require('fs');
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors());

app.get('/api/get_tasks', (req, res) => {
    res.json(require('./data/tasks.json'));
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId: string = req.params.id;
  const filePath = path.join(__dirname, './data/tasks.json');

  fs.readFile(filePath, (err: any, data: string) => {
    if (err) {
        return res.status(500).send({ message: 'Error reading tasks file' });
    }

    let tasks = JSON.parse(data);

    // Find the index of the task with the given ID
    const taskIndex = tasks.findIndex((task: { id: string; }) => task.id === taskId);

    if (taskIndex !== -1) {
        // Remove the task from the array
        tasks.splice(taskIndex, 1);

        // Write the updated array back to the file
        fs.writeFile(filePath, JSON.stringify(tasks, null, 2), (err: any) => {
            if (err) {
                return res.status(500).send({ message: 'Error writing tasks file' });
            }
            io.emit('taskDeleted', taskId); 
            res.status(200).send({ message: `Task ${req.params.id} deleted successfully` });
        });
    } else {
        // Task not found
        res.status(404).send({ message: 'Task not found' });
    }
  });
});

// POST creates new data ON the server
app.post('/api/items', (req, res) => {
  // Logic to add a new item
  // Use req.body to access posted data
  console.log(req.body);
  // io.emit('taskAdded', newTask)
  res.status(201).send('Item created');
});

// PUT updates existing data on server ENTIRELY
app.put('/api/items/:id', (req, res) => {
  // Logic to update an item ENTIRELY
  // Access the item id with req.params.id
  // io.emit('taskUpdated', updatedTask);  // Replace `updatedTask` with the actual task object
  res.send(`Item ${req.params.id} updated`);
});

// PATCH updates existing data on server PARTIALLY
app.patch('/api/items/:id', (req, res) => {
  // Logic to partially update an item
  // io.emit('taskUpdated', updatedTask);  // Replace `updatedTask` with the actual task object
  res.send(`Item ${req.params.id} partially updated`);
});




app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
