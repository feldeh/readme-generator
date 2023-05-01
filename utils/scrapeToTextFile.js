import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { numToken } from './numToken.js';

const getLinks = async (page, linkSelector) => {
    const links = await page.$$eval(linkSelector, (links) => {
        const excludePattern =
            /yarn|package|config|\bpublic\b|\bassets\b|\bstyles\b|\btypes\b|.css|svg|.gitignore|.prettierrc|.md/;

        return links
            .filter(
                (link) =>
                    link.href !== link.baseURI &&
                    link.title !== 'Go to parent directory' &&
                    !excludePattern.test(link.href)
            )
            .map((link) => link.href);
    });
    return links;
};

const getFileCode = async (page, codeSelector) => {
    const fileCode = await page.$eval(codeSelector, (el) => {
        return el.innerText;
    });
    return fileCode;
};

const getAllFileCode = async (page, links, codeSelector, linkSelector) => {
    const allFileCode = [];

    for (const link of links) {
        await page.goto(link);
        const isSelectorFound = await isSelectorPresent(page, codeSelector);
        if (isSelectorFound) {
            const fileCode = await getFileCode(page, codeSelector);
            allFileCode.push(fileCode);
        } else {
            const folderLinks = await getLinks(page, linkSelector);
            console.log(
                'the following files and folders where found: ',
                folderLinks
            );

            const nestedFileCode = await getAllFileCode(
                page,
                folderLinks,
                codeSelector,
                linkSelector
            );
            allFileCode.push(nestedFileCode);
        }
    }

    const truncatedCode = allFileCode.flat().join('\n---').replace(/\s+/g, ' ');

    return truncatedCode;
};

const isSelectorPresent = async (page, codeSelector, timeout = 100) => {
    try {
        await page.waitForSelector(codeSelector, { timeout });
        console.log(`scraping: ${await page.url()}`);
        return true;
    } catch (error) {
        console.log(`scraping: ${await page.url()}`);

        return false;
    }
};

const scrapeCode = async (repoUrl) => {
    try {
        const linkSelector = 'a.js-navigation-open';
        const codeSelector = 'table';

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(repoUrl);

        const links = await getLinks(page, linkSelector);

        const allFileCode = await getAllFileCode(
            page,
            links,
            codeSelector,
            linkSelector
        );

        await browser.close();

        return allFileCode;
    } catch (error) {
        throw error;
    }
};

export async function scrapeToTextFile(repoUrl) {
    try {
        console.log('start of scraping sequence...');

        const scrapedCode = await scrapeCode(repoUrl);

        const fileName = 'repoSourceCode.txt';

        await writeFile(fileName, scrapedCode);
        console.log(`source code written to ${fileName} successfully!`);
        console.log(`source code contains ${numToken(scrapedCode)} tokens`);
    } catch (error) {
        throw error;
    }
}
