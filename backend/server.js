const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

dotenv.config();

const app = express();

app.use(cors(
    {
    origin: [
      "http://localhost:5173",      // local development
      "https://capstone-project3-psi.vercel.app", // YOUR VERCEL FRONTEND
    ],
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  }
));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
})

app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});