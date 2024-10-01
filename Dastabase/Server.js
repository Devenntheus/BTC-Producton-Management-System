const express = require('express');
const sql = require('mssql');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbConfig = {
    server: '192.168.68.94',
    database: 'BTCPower',
    user: 'sa',
    password: 'PASSWORD1!',
    options: {
        encrypt: true,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

// Connect to the database
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database connected successfully.');
});

// API endpoint to get alert history
app.get('/api/alerts', async (req, res) => {
    console.log('Received request for alerts');
    try {
        // Create a new connection for each request
        await sql.connect(dbConfig);
        const result = await sql.query('SELECT Severity, Time, AlertName, Issue FROM AlertHistory');
        console.log('Query successful:', result.recordset);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Server error');
    } finally {
        // Close the connection
        sql.close();
    }
});

// Endpoint to get manhours data
app.get('/api/manhours', async (req, res) => {
    try {
        // Connect to MSSQL
        await sql.connect(dbConfig);

        // Query the database
        const result = await sql.query('SELECT Label, AvailableManhours, PresentManhours FROM AvailableManhours');

        // Send the result as a JSON response
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error retrieving data');
    }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));