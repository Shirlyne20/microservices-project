const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
const port = 4000;

app.use(cors());

// PostgreSQL connection
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'microservices',
    password: 'admin123',
    port: 5432,
});

// Redis connection
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.connect();

app.get('/test', (req, res) => {
    res.json({ message: 'Test route works!' });
});

// API Endpoint
app.get('/', async (req, res) => {
    try {
        const dbRes = await pool.query('SELECT NOW()');
        await redisClient.set('last_access', new Date().toISOString());
        const lastAccess = await redisClient.get('last_access');

        res.json({
            db_time: dbRes.rows[0].now,
            last_access: lastAccess,
        });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Node.js backend running on port ${port}`);
});
