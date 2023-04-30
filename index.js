#!/usr/bin/env node

import { Command } from 'commander';
import figlet from 'figlet';
import { scrapeToTextFile } from './utils/scrapeToTextFile.js';
import { readFromTextFile } from './utils/readFromTextFile.js';
import { gptAPI } from './utils/gptAPI.js';
import { numToken } from './utils/numToken.js';

const program = new Command();

console.log(figlet.textSync('Repo Scanner'));

program
    .name('repo-scanner')
    .description(
        'A CLI to scan source code from Github for vulnerabilites using chatGPT API'
    )
    .version('1.0.0');

program
    .command('scrape')
    .description(
        'Scrape source code from a Github repository url and save it to text file.'
    )
    .argument('<url>', 'url to scrape')
    .action((url) => {
        scrapeToTextFile(url);
    });

program
    .command('analyse')
    .description('Analyse source code using OpenAI.')
    .action(async () => {
        const sourceCode = await readFromTextFile();
        const gptRes = await gptAPI(sourceCode);
        console.log(gptRes);
    });

program
    .command('tokencount')
    .description('Return the number of tokens.')
    .action(async () => {
        const sourceCode = await readFromTextFile();
        const tokens = numToken(sourceCode);
        console.log(`The source code contains ${tokens} tokens.`);
    });

// program
//     .command('analyse <filename> <apikey>')
//     .description('analyse source code using OpenAI.')
//     .action((filename, apikey) => {
//         analyseCommand(url, apikey);
//     });

program.parse(process.argv);
