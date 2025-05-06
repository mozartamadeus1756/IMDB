require('dotenv').config();
const mariadb = require('mariadb');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5173;

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONN_LIMIT
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); 

app.post('/register', async (req, res) => {
    let conn;
    try {
        const { username, email, password } = req.body;
  
        conn = await pool.getConnection();
        await conn.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
  
        res.json({ success: true, message: 'user registered successfully' });
    } catch (error) {
        console.error('registration error:', error);
        res.status(500).json({ success: false, message: 'registration failed' });
    } finally {
        if (conn) await conn.release();
    } 
});


app.listen(port, () => {
    console.log(`Server running!`); //  http://localhost:${port}
  });
  