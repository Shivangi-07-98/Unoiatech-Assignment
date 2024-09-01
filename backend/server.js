require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoutes = require('./router/scrapeRouter');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // To serve screenshots

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', companyRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running on http://localhost:5000');
});
