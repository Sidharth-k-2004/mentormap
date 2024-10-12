const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import cors
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root123', 
    database: 'mentormap'
});

// Connect to the MySQL database
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database.');
});

// Route for signup
app.post('/', (req, res) => {
    const { SRN, NAME, CLASS, EMAIL, PASS, DEPT_ID } = req.body;
  
    const sql = 'INSERT INTO student (SRN, NAME, CLASS, EMAIL, PASS, DEPT_ID) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [SRN, NAME, CLASS, EMAIL, PASS, DEPT_ID];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        return res.status(500).json({ error: 'Database insertion failed' });
      }
  
      console.log('Student signed up successfully');
      res.status(200).json({ message: 'Student signed up successfully' });
    });
  });
  

app.post('/login', (req, res) => {
    const { srn, password } = req.body;

    // Check if the credentials match a student in the database
    const loginQuery = 'SELECT * FROM Student WHERE SRN = ?';
    db.query(loginQuery, [srn], (err, results) => {
        if (err) {
            return res.status(500).send('Error checking credentials.');
        }

        // If user not found
        if (results.length === 0) {
            return res.status(401).send('Invalid SRN or password.');
        }

        const user = results[0];

        // Here you should verify the password (if hashed)
        // For demonstration, we're checking plain text. In production, use bcrypt or similar.
        if (user.PASS === password) {
            res.send('Login successful.');
        } else {
            res.status(401).send('Invalid SRN or password.');
        }
    });
});
app.post('/faculty', (req, res) => {
    const { T_ID, NAME, EMAIL, PASS, DEPT_ID } = req.body;
  
    const sql = 'INSERT INTO teacher (T_ID, NAME,  EMAIL, PASS, DEPT_ID) VALUES (?, ?, ?, ?, ?)';
    const values = [T_ID, NAME,  EMAIL, PASS, DEPT_ID];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        return res.status(500).json({ error: 'Database insertion failed' });
      }
  
      console.log('signed up successfully');
      res.status(200).json({ message: 'Student signed up successfully' });
    });
  });
  

app.post('/facultylogin', (req, res) => {
    const { tid, password } = req.body;

    // Check if the credentials match a student in the database
    const loginQuery = 'SELECT * FROM teacher WHERE T_ID = ?';
    db.query(loginQuery, [tid], (err, results) => {
        if (err) {
            return res.status(500).send('Error checking credentials.');
        }

        // If user not found
        if (results.length === 0) {
            return res.status(401).send('Invalid tid or password.');
        }

        const user = results[0];

        // Here you should verify the password (if hashed)
        // For demonstration, we're checking plain text. In production, use bcrypt or similar.
        if (user.PASS === password) {
            res.send('Login successful.');
        } else {
            res.status(401).send('Invalid teacherid or password.');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
