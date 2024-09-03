require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const companyRoutes = require('./router/scrapeRouter');

const app = express();
app.use(express.json())

app.use(bodyParser.json());

// app.use(cors(
//   {
//     origin: ["https://unoiatech-assignment-frontend.vercel.app"],
//     methods: ["POST", "GET"],
//     credentials: true
//   }
// ));



// Define the CORS options
const corsOptions = {
  origin: ["https://unoiatech-assignment-frontend.vercel.app"],
  methods: ["POST", "GET", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],  // Add any other headers you might be using
  credentials: true,  // Allow cookies/auth tokens
};

// Use the CORS middleware
app.use(cors(corsOptions));

// Ensure you handle OPTIONS requests
app.options('*', cors(corsOptions));

// CORS headers configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://unoiatech-assignment-frontend.vercel.app"); // Allows requests from your frontend domain
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT"); // Specifies allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Specifies allowed headers
  res.header("Access-Control-Allow-Credentials", "true"); // If you need to allow cookies or authentication headers
  next();
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api', companyRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
