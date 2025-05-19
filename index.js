const readline = require('readline');

// Regular expressions
const patterns = {
    email: /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
    url: /\bhttps?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?\b/g,
    phone: /\b(\(\d{3}\)\s*|\d{3}[-.])\d{3}[-.]\d{4}\b/g,
    creditCard: /\b(?:\d{4}[- ]?){3}\d{4}\b/g
};

// Sample web pages for test mode
const testUrls = [
    'http://support.worldpay.com/support/CNP-API/content/appendbcredit.htm',
    'https://www.google.com/search?q=212-456-7890+%28123%29+456-7890',
    'https://www.google.com/search?q=1234-5678-9012-3456'
];

function extractMatches(pattern, text) {
    return text.match(pattern) || [];
}

async function scanText(input) {
    return {
        emails: extractMatches(patterns.email, input),
        urls: extractMatches(patterns.url, input),
        phones: extractMatches(patterns.phone, input),
        creditCards: extractMatches(patterns.creditCard, input)
    };
}

async function scanWebData(link) {
    try {
        console.log(`\nFetching: ${link}`);
        const response = await fetch(link);
        const text = await response.text();
        return await scanText(text);
    } catch (err) {
        return { error: `Failed to fetch or process: ${err.message}` };
    }
}

function isValidUrl(str) {
    try {
        new URL(str);
        return true;
    } catch {
        return false;
    }
}

function displayResults(results) {
    if (results.error) {
        console.log(results.error);
        return;
    }

    console.log('\n--- Scan Results ---');
    console.log('Emails:', results.emails.length > 0 ? results.emails : 'No emails');
    console.log('URLs:', results.urls.length > 0 ? results.urls : 'No URLs');
    console.log('Phone Numbers:', results.phones.length > 0 ? results.phones : 'No phone numbers');
    console.log('Credit Card Numbers:', results.creditCards.length > 0 ? results.creditCards : 'No credit card numbers');
    console.log('--------------------\n');
}

function promptMainMenu(rl) {
    rl.question(`Choose a mode:
1. Try with test web data
2. Input your own data
3. Quit
> `, async (choice) => {
        if (choice === '1') {
            const randomLink = testUrls[Math.floor(Math.random() * testUrls.length)];
            const results = await scanWebData(randomLink);
            displayResults(results);
            promptMainMenu(rl);
        } else if (choice === '2') {
            promptCustomInput(rl);
        } else if (choice === '3') {
            console.log('Exiting.');
            rl.close();
        } else {
            console.log('\nInvalid choice.\n');
            promptMainMenu(rl);
        }
    });
}

function promptCustomInput(rl) {
    rl.question(`Choose an option:
1. Paste text
2. Provide a web URL
3. Quit
> `, async (answer) => {
        if (answer === '1') {
            rl.question('\nEnter your text:\n> ', async (text) => {
                const results = await scanText(text);
                displayResults(results);
                promptMainMenu(rl);
            });
        } else if (answer === '2') {
            rl.question('\nEnter URL:\n> ', async (urlInput) => {
                if (isValidUrl(urlInput)) {
                    const results = await scanWebData(urlInput);
                    displayResults(results);
                } else {
                    console.log('Not a valid URL. Running scan as plain text input.\n');
                    const results = await scanText(urlInput);
                    displayResults(results);
                }
                promptMainMenu(rl);
            });
        } else if (answer === '3') {
            console.log('Exiting.');
            rl.close();
        } else {
            console.log('\nInvalid option.\n');
            promptCustomInput(rl);
        }
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

promptMainMenu(rl);
