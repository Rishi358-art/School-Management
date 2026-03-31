require('dotenv').config({ path: './.env' });
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const schoolRoutes = require('./routes/schoolRoutes');
app.use('/', schoolRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("DB_USER:", process.env.DB_USER);
});
