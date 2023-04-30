#!/usr/bin/env node

import { program } from 'commander';
import { scrapeToText } from '../commands/scrapeCommand.js';
// import analyzeCommand from '../commands/analyzeCommand';

program.version('1.0.0');

program
    .command('scrape <url>')
    .description(
        'Scrape source code from a GitHub repository and load it to text file.'
    )
    .action((url) => {
        scrapeToText(url);
    });

program
    .command('--analyse <url> <apikey>')
    .description('Analyze source code using OpenAI.')
    .action((url, apikey) => {
        analyzeCommand(url, apikey);
    });

program.parse(process.argv);
