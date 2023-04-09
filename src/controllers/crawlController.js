const puppeteer = require("puppeteer");

const getLinks = async (page) => {
  const links = await page.$$eval("a.js-navigation-open", (links) => {
    const excludePattern = /yarn|package|config|public|assets/;
    // const includePattern = /index/;
    return links
      .filter(
        // (link) => link.href !== link.baseURI && includePattern.test(link.href)
        (link) => link.href !== link.baseURI && !excludePattern.test(link.href)
      )
      .map((link) => link.href);
  });
  return links;
};

const getAllFileCode = async (page, links) => {
  const allFileCode = [];
  const selector = "table";

  for (const link of links) {
    await page.goto(link);
    const fileCode = await page.$eval(selector, (el) => el.innerText);
    allFileCode.push(fileCode);
  }
  return allFileCode;
};

const crawlRepo = async (req, res) => {
  const repoUrl = "https://github.com/John4E656F/3d-portfolio";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(repoUrl);

  const links = await getLinks(page);
  console.log("Links", links);

  const allFileCode = await getAllFileCode(page, links);
  console.log("allFileCode", allFileCode);

  await browser.close();

  res.json(allFileCode);
};

module.exports = (req, res) => {
  crawlRepo(req, res);
};
