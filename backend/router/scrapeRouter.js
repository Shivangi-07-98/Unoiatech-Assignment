const express = require('express');
const router = express.Router();
const companyController = require('../controller/scrapeController');
const upload = require('../config/multer'); //

router.post('/upload', upload.single('file'), companyController.handleFileUpload); //
router.post('/scrape', companyController.scrapeAndSaveCompany);
router.get('/companies', companyController.getAllCompanies);
router.delete('/companies', companyController.deleteCompanies);
router.get('/companies/csv', companyController.downloadCompaniesCSV);

module.exports = router;
