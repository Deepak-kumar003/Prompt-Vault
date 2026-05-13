const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRouter = require('./routes/auth')
const promptRouter = require('./routes/prompts')

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter)
app.use('/api/prompts', promptRouter)


app.get("/", (req,res) => {
    res.json({message: "This is prompt vault api."})
})

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => {
    console.log(`server is running in port: ${PORT}`);
});
