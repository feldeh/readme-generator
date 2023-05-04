# Repo Scanner

## Description

Repo Scanner is a command-line interface (CLI) tool designed to scan source code from GitHub for vulnerabilities using OpenAI's GPT-3 language model. This tool can scrape source code from a GitHub repository and analyse it for potential security vulnerabilities.

## Installation

To install Repo Scanner, first, clone this repository onto your local machine by running:

```
git clone https://github.com/feldeh/repo-vulnerability-scanner.git
```

Then navigate to the top level of the directory and install the dependencies by running:

```
npm install && npm link
```

## Usage

### Scrape command

The `scrape` command scrapes source code from a GitHub repository URL and saves it to a text file. To use this command run:

```
repo-scanner scrape <url>
```

Where `<url>` is the URL of the GitHub repository you want to scrape.

### Analyse command

The `analyse` command analyses the source code using OpenAI's GPT-3 language model. To use this command run:

```
repo-scanner analyse -k <api_key>
```

Where `<api_key>` is your OpenAI API key. This command will analyse the source code stored in `repoSourceCode.txt` and return a list of potential security vulnerabilities. The response is limited to 200 tokens and only the first three vulnerabilities are listed.

### Token count command

The `tokencount` command returns the number of tokens in the source code. To use this command run:

```
repo-scanner tokencount
```

This command will return the number of tokens in the source code stored in `repoSourceCode.txt`.

## Remove

If you wish to remove the cli from your system run:

```
sudo npm rm --global repo-scanner
```
