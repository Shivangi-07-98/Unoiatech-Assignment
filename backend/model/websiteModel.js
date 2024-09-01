const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  url: String,
  name: String,
  description: String,
  logoUrl: String,
  facebookUrl: String,
  linkedinUrl: String,
  twitterUrl: String,
  instagramUrl: String, 
  address: String,
  phoneNumber: String,
  email: String,
  screenshot: String
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
