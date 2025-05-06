require('dotenv').config();
// const mariadb = require('mariadb');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 5173;

// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: process.env.DB_CONN_LIMIT
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());  

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Server running!`); //  http://localhost:${port}
  });


