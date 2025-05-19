# Regex Scanner CLI

A Node.js command-line tool to scan text or web content for common patterns using Regular Expressions.

## Supported Patterns

- Email addresses
- URLs
- Phone numbers
- Credit card numbers

## Features

- Scan using test data from sample URLs
- Paste your own text input
- Provide a custom URL to fetch and scan
- Graceful handling of invalid inputs
- Output clearly indicates if nothing was found

## Requirements

- Node.js v18 or newer (uses native `fetch` API)

## Usage

### 1. Run the script

    node scanner.js

### 2. Choose scan mode

You will be asked to select:

    Choose a mode:
    1. Try with test web data
    2. Input your own data
    3. Quit

#### Option 1 - Test Data

Scans a randomly selected test URL from the built-in list:

- https://www.uiowa.edu/~s007689/test.txt
- https://www.cs.cmu.edu/~spok/grimmtmp/073.txt
- https://people.sc.fsu.edu/~jburkardt/data/csv/addresses.csv

The chosen link will be displayed before processing.

#### Option 2 - Custom Input

Prompts another menu:

    Choose an option:
    1. Paste text
    2. Provide a web URL
    3. Quit

- If pasting text, it will be scanned immediately
- If a valid URL is provided, it fetches and scans it
- If input is not a valid URL, it will be scanned as plain text

### 3. Output Format

Results are printed as:

    --- Scan Results ---
    Emails: [ 'user@example.com' ]
    URLs: [ 'https://example.com' ]
    Phone Numbers: [ '123-456-7890' ]
    Credit Card Numbers: [ '1234 5678 9012 3456' ]
    --------------------

If nothing is found in a category:

    Emails: No emails
    URLs: No URLs
    Phone Numbers: No phone numbers
    Credit Card Numbers: No credit card numbers

## Regex Patterns Used

- **Email**: `\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b`
- **URL**: `\bhttps?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?\b`
- **Phone**: `\b(\(\d{3}\)\s*|\d{3}[-.])\d{3}[-.]\d{4}\b`
- **Credit Card**: `\b(?:\d{4}[- ]?){3}\d{4}\b`

## Notes

- Extendable to support hashtags, HTML tags, currency, and more
- Uses only standard Node.js modules (no external dependencies)
- Works fully in CLI without a browser

## License

MIT
