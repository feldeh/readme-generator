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

program.parse(process.argv);
