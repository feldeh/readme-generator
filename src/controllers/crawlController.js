const puppeteer = require("puppeteer");

const crawlRepo = async (req, res) => {
  const repoUrl = "https://github.com/John4E656F/3d-portfolio";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(repoUrl);

  const fileLinks = await page.$$eval("a.js-navigation-open", (links) => {
    const excludePattern = /yarn|package|config/;
    return links
      .filter(
        (link) => link.href !== link.baseURI && !excludePattern.test(link.href)
      )
      .map((link) => link.href);
  });

  console.log("fileLinks", fileLinks);

  const files = [];

  for (const fileLink of fileLinks) {
    await page.goto(fileLink);
    const fileCode = await page.$eval("table", (el) => el.innerText);
    files.push(fileCode);
  }

  console.log("files", files);

  await browser.close();

  res.json(files);
};

module.exports = (req, res) => {
  crawlRepo(req, res);
};
