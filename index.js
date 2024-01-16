const connection = require('./config');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// getdata api
app.get('/api/getData', (req, res) => {
  const query = 'SELECT * FROM task_details';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
});

// app.post('/api/insertData', (req, res) => {
//   console
//   const { title, description } = req.body;
//   const query = 'INSERT INTO task_details (title, description) VALUES (?, ?)';

//   con.query(query, [title, description], (error, results) => {
//       if (error) {
//           console.error('Error inserting data into database:', error);
//           res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//           res.status(200).json({ message: 'Data inserted successfully' });
//           console.log("data inserted successfully")
//       }
//   });
// });


app.post('/api/insertData/', (req, res) => {
  const { title, description, duedate, priority, status } = req.body;
  // Replace 'your_table_name' with your actual table name
  const query = 'INSERT INTO task_details (title, description, duedate, priority, status) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [title, description, duedate, priority, status], (error, results) => {
    if (error) {
      console.error('Error inserting form data into database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Form data inserted successfully' });
    }
  });
});

app.delete('/api/deleteData/:id', (req, res) => {
  const idToDelete = req.params.id;

  const query = 'DELETE FROM task_details WHERE id = ?';
  connection.query(query, [idToDelete], (error, results) => {
    if (error) {
      console.error('Error deleting data from the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ error: 'Record not found' });
      }
    }
  });
});

app.put('/api/updateData/:id', (req, res) => {
  const idToUpdate = req.params.id;
  const { title, description, duedate, priority, status } = req.body;
  const query = 'UPDATE task_details SET title = ?, description = ?, duedate = ? , priority = ?, status = ? WHERE id = ?';
  connection.query(query, [title, description, duedate, priority, status, idToUpdate], (error, results) => {
    if (error) {
      console.error('Error updating data in the database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Data updated successfully' });
      } else {
        res.status(404).json({ error: 'Record not found' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});