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

// Create a connection pool
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Database connected successfully.');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed:', err);
    });

// API endpoint to get alert history
app.get('/api/alerts', async (req, res) => {
    console.log('Received request for alerts');
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT Severity, Time, AlertName, Issue FROM AlertHistory');
        console.log('Query successful:', result.recordset);
        res.json(result.recordset);
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Server error');
    }
});

// API endpoint to get availability chart data
app.get('/api/availability', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT label, data, category FROM AvailabilityChart1');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Server error');
    }
});

// API endpoint to get availability chart 2 data
app.get('/api/availability2', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT label, duration_sum, cumulative_percentage FROM AvailabilityChart2');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).send('Server error');
    }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));