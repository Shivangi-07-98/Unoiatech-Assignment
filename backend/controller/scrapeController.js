const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const Company = require('../model/websiteModel');

exports.handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }
    
    const filePath = path.join('uploads', req.file.filename);

    const newCompany = new Company({
      logoUrl: filePath
    });

    await newCompany.save();

    res.status(200).json({ message: 'File uploaded successfully.', file: req.file });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload file.' });
  }
};

exports.scrapeAndSaveCompany = async (req, res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
      const getMetaContent = (name) => document.querySelector(`meta[name="${name}"]`)?.content || '';
      const getAttributeValue = (selector, attr) => document.querySelector(selector)?.getAttribute(attr) || '';
      const getTextContent = (selector) => document.querySelector(selector)?.textContent || '';

      return {
        name: getMetaContent('og:site_name') || document.title,
        description: getMetaContent('description'),
        logoUrl: getAttributeValue('img[alt="logo"]', 'src') || getAttributeValue('link[rel="icon"]', 'href'),
        facebookUrl: getAttributeValue('a[href*="facebook.com"]', 'href'),
        linkedinUrl: getAttributeValue('a[href*="linkedin.com"]', 'href'),
        twitterUrl: getAttributeValue('a[href*="twitter.com"]', 'href'),
        instagramUrl: getAttributeValue('a[href*="instagram.com"]', 'href'),
        address: getTextContent('.address') || getTextContent('[itemprop="address"]'),
        phoneNumber: getTextContent('a[href^="tel:"]'),
        email: getTextContent('a[href^="mailto:"]'),
      };
    });

    const screenshotDir = path.join('uploads', 'screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });
    const screenshotPath = path.join(screenshotDir, `${Date.now()}.png`);

    await page.screenshot({ path: screenshotPath });

    const newCompany = new Company({ url, screenshot: screenshotPath, ...data });
    await newCompany.save();

    await browser.close();
    res.status(200).json({ message: 'Data scraped and saved.', data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to scrape data.' });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    res.status(200).json(companies);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch companies.' });
  }
};

exports.deleteCompanies = async (req, res) => {
  const { ids } = req.body;
  try {
    await Company.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: 'Companies deleted successfully.' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete companies.' });
  }
};

exports.downloadCompaniesCSV = async (req, res) => {
  const { Parser } = require('json2csv');
  try {
    const companies = await Company.find({});
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(companies);

    res.header('Content-Type', 'text/csv');
    res.attachment('companies.csv');
    res.status(200).send(csv);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to generate CSV.' });
  }
};
