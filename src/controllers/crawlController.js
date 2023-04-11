const puppeteer = require("puppeteer");

const getLinks = async (page, linkSelector) => {
  const links = await page.$$eval(linkSelector, (links) => {
    const excludePattern =
      /yarn|package|config|\bpublic\b|\bassets\b|\bstyles\b|\btypes\b|.css|svg/;

    return links
      .filter(
        (link) =>
          link.href !== link.baseURI &&
          link.title !== "Go to parent directory" &&
          !excludePattern.test(link.href)
      )
      .map((link) => link.href);
  });
  return links;
};

const getAllFileCode = async (page, links, codeSelector, linkSelector) => {
  const allFileCode = [];

  for (const link of links) {
    await page.goto(link);
    const isSelectorFound = await isSelectorPresent(page, codeSelector);
    if (isSelectorFound) {
      const fileCode = await page.$eval(codeSelector, (el) => el.innerText);
      allFileCode.push(fileCode);
    } else {
      const folderLinks = await getLinks(page, linkSelector);
      console.log("folderLinks: ", folderLinks);

      const nestedFileCode = await getAllFileCode(
        page,
        folderLinks,
        codeSelector,
        linkSelector
      );
      allFileCode.push(nestedFileCode);

      console.log("nestedFileCode", nestedFileCode);
    }
  }
  return allFileCode;
};

const isSelectorPresent = async (page, codeSelector, timeout = 500) => {
  try {
    await page.waitForSelector(codeSelector, { timeout });
    console.log(`Selector '${codeSelector}' is present on the page.`);
    return true;
  } catch (error) {
    console.log("isSelectorPresent error: ", error);
    console.log(`Selector '${codeSelector}' is not present on the page.`);
    console.log(`Current URL: ${await page.url()}`);

    return false;
  }
};

const crawlRepo = async (req, res) => {
  // const repoUrl = "https://github.com/feldeh/readme-generator";
  const repoUrl = "https://github.com/John4E656F/earthbnb";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(repoUrl);

  const linkSelector = "a.js-navigation-open";
  const codeSelector = "table";

  const links = await getLinks(page, linkSelector);
  console.log("Links", links);

  const allFileCode = await getAllFileCode(
    page,
    links,
    codeSelector,
    linkSelector
  );
  console.log("allFileCode", allFileCode);

  await browser.close();

  res.send(allFileCode);
};

module.exports = (req, res) => {
  crawlRepo(req, res);
};
