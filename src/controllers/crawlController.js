const puppeteer = require("puppeteer");

const getAllLinks = async (page) => {
  const allLinks = await page.$$eval("a.js-navigation-open", (links) => {
    const excludePattern = /yarn|package|config|public|assets/;
    return links
      .filter(
        (link) => link.href !== link.baseURI && !excludePattern.test(link.href)
      )
      .map((link) => link.href);
  });
  return allLinks;
};

const crawlRepo = async (req, res) => {
  const repoUrl = "https://github.com/John4E656F/3d-portfolio";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(repoUrl);

  const allLinks = await getAllLinks(page);

  console.log("allLinks", allLinks);

  const files = [];

  const selector = "table";
  const element = await page.$(selector);

  if (element) {
    console.log(`Selector '${selector} is present on the page.`);
  } else {
    console.log(`Selector ${selector} is not present on the page.`);
  }

  for (const allLink of allLinks) {
    await page.goto(allLink);
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
