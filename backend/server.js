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
app.use(cors(
  {
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));

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
