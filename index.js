const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/render', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Please provide a URL as a query parameter.');
  }

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const html = await page.content();
    await browser.close();

    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).send('Error rendering the page: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
