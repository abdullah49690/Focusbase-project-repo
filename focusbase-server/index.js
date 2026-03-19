
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const authRoutes = require("./routes/authRoutes");


const app = express()

require("dotenv").config();
dotenv.config();

app.use(helmet());

app.use(cors());
app.use(express.json());


app.use("api/auth", authRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})


