#!/usr/bin/env node

import { Command } from 'commander';
import figlet from 'figlet';
import { scrapeToTextFile } from './utils/scrapeToTextFile.js';
import { readFromTextFile } from './utils/readFromTextFile.js';
import { gptAPI } from './utils/gptAPI.js';
import { numToken } from './utils/numToken.js';

const program = new Command();

console.log(figlet.textSync('Repo Scanner\n\n\n'));

program
    .name('repo-scanner')
    .description(
        'A CLI to scan source code from Github for vulnerabilites using chatGPT.'
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
    .option('-k, --apikey <key>', 'API key for chatGPT')
    .action(async (options) => {
        const sourceCode = await readFromTextFile();
        const tokens = numToken(sourceCode);
        if (tokens > 3800) {
            console.log(
                `This source code contains ${tokens} which exceeds chatGPT token limit. Please use source code containing less than 3800 tokens.`
            );
            return;
        }
        const gptRes = await gptAPI(sourceCode, options.apikey);
        if (gptRes.status.toString()[0] == '2') {
            const gptMessage = gptRes.data.choices[0].message.content;
            console.log(
                `After analyzing the source code, chatGPT found the following security vulnerabilities:\n\n${gptMessage}`
            );
        }
        if (gptRes.status.toString()[0] == '4') {
            console.log(gptRes.data.error.message);
        }
    });

program
    .command('tokencount')
    .description('Return the number of tokens.')
    .action(async () => {
        const sourceCode = await readFromTextFile();
        const tokens = numToken(sourceCode);
        console.log(`The source code contains ${tokens} tokens.`);
    });

program.parse(process.argv);
