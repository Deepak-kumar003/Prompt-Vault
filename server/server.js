const express = require('express');
const cros = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cros());
app.use(express.json());

app.get("/", (req,res) => {
    res.json({message: "This is prompt vault api."})
})

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => {
    console.log(`server is running in port: ${PORT}`);
});
