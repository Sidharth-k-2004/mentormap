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
    const { srn, name, email, class: studentClass, password } = req.body;

    // Insert the data into the Student table
    const insertQuery = 'INSERT INTO Student (student_id, name, email, class, password) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [srn, name, email, studentClass, password], (err, result) => {
        if (err) {
            return res.status(500).send('Error adding student to the database.');
        }
        res.status(201).send('Student registered successfully.');
    });
});

// Route for login
app.post('/login', (req, res) => {
    const { srn, password } = req.body;

    // Check if the credentials match a student in the database
    const loginQuery = 'SELECT * FROM Student WHERE student_id = ? AND password = ?';
    db.query(loginQuery, [srn, password], (err, results) => {
        if (err) {
            return res.status(500).send('Error checking credentials.');
        }
        if (results.length > 0) {
            res.send('Login successful.');
        } else {
            res.status(401).send('Invalid SRN or password.');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
