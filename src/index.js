const puppeteer = require("puppeteer");

// const repoUrl = "http://localhost:3000/";

// async function crawlRepo() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(repoUrl);

//   const fileLinks = await page.$$eval("a", (links) => {
//     return links
//       .filter((link) => link.hasAttribute("href"))
//       .map((link) => link.href);
//   });

//   for (const fileLink of fileLinks) {
//     await page.goto(fileLink);
//     const fileCode = await page.$eval("p", (el) => el.innerText);
//     console.log(fileCode);
//   }
//   await browser.close();
// }

const repoUrl = "https://github.com/John4E656F/3d-portfolio";

async function crawlRepo() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(repoUrl);

  const fileLinks = await page.$$eval("a.js-navigation-open", (links) => {
    {
      return links
        .filter(
          //   (link) => !(link.href.includes("src") || link.href.includes("public"))
          (link) => link.href.includes("index")
        )
        .map((link) => link.href);
    }
  });

  for (const fileLink of fileLinks) {
    await page.goto(fileLink);
    const fileCode = await page.$eval("table", (el) => el.innerText);
    console.log(fileCode);
  }
  await browser.close();
}

crawlRepo();
