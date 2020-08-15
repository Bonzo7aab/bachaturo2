require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./api/routes')


const PORT = process.env.PORT || 4000

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes)

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}...`))