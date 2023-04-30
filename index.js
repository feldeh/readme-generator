#!/usr/bin/env node

import { Command } from 'commander';
import figlet from 'figlet';
import { scrapeToText } from './utils/scrapeToText.js';
// import analyseCommand from '../commands/analyseCommand';

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
        scrapeToText(url);
    });

// program
//     .command('analyse <filename> <apikey>')
//     .description('analyse source code using OpenAI.')
//     .action((filename, apikey) => {
//         analyseCommand(url, apikey);
//     });

program.parse(process.argv);
