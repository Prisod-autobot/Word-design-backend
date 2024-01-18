const express = require('express');
const cors = require('cors');
const portConfig = require('./src/config/config');
const database_conn = require('./src/config/database');
const translateRoute = require('./src/controllers/translate');
// Models
require('./src/models/Associations');

// Sync Database
// database_conn.sync({ force: false })
//     .then(() => {
//         console.log('Database synced successfully.\n');
//     })
//     .catch((error) => {
//         console.log('unable to sync the database: ', error);
//     });

const app = express();

app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);

// Routes
app.use(express.json());
app.use(translateRoute);

app.listen(portConfig.PORT, () => {
    console.log(`Port running on port ${portConfig.PORT}`);
});