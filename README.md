# Repo Scanner

Repo Scanner is a command-line interface (CLI) tool designed to scan source code from GitHub for vulnerabilities using OpenAI's GPT-3 language model. This tool can scrape source code from a GitHub repository and analyse it for potential security vulnerabilities.

## Usage

To use Repo Scanner, first, clone this repository onto your local machine. Then, install the dependencies by running `npm install`.

After installing the dependencies, you can use the following commands:

### Scrape

The `scrape` command scrapes source code from a GitHub repository URL and saves it to a text file. To use this command, run:

```bash
repo-scanner scrape <url>
```

Where `<url>` is the URL of the GitHub repository you want to scrape.

### Analyse

The `analyse` command analyses the source code using OpenAI's GPT-3 language model. To use this command, run:

```bash
repo-scanner analyse -k <api_key>
```

Where `<api_key>` is your OpenAI API key. This command will analyse the source code stored in `repoSourceCode.txt` and return a list of potential security vulnerabilities. The response is limited to 200 tokens, and only the first three vulnerabilities are listed.

### Token Count

The `tokencount` command returns the number of tokens in the source code. To use this command, run:

```bash
repo-scanner tokencount
```

This command will return the number of tokens in the source code stored in `repoSourceCode.txt`.
