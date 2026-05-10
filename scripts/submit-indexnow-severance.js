const axios = require('axios');

const KEY = 'f45c2f8b88d34796b94904d5e3abf608';
const HOST = 'www.severancecalculator.xyz';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const links = [
    "https://www.severancecalculator.xyz/",
    "https://www.severancecalculator.xyz/about.html",
    "https://www.severancecalculator.xyz/contact.html",
    "https://www.severancecalculator.xyz/blog/index.html",
    "https://www.severancecalculator.xyz/blog/uae-gratuity.html",
    "https://www.severancecalculator.xyz/blog/uk-redundancy.html",
    "https://www.severancecalculator.xyz/blog/india-gratuity.html",
    "https://www.severancecalculator.xyz/blog/pakistan-gratuity.html",
    "https://www.severancecalculator.xyz/blog/philippines-separation.html",
    "https://www.severancecalculator.xyz/blog/saudi-gratuity.html",
    "https://www.severancecalculator.xyz/blog/canada-severance.html",
    "https://www.severancecalculator.xyz/blog/global-comparison.html",
    "https://www.severancecalculator.xyz/legal/privacy-policy.html",
    "https://www.severancecalculator.xyz/legal/terms-and-conditions.html",
    "https://www.severancecalculator.xyz/legal/disclaimer.html"
];

async function submitToIndexNow() {
    try {
        const payload = {
            host: HOST,
            key: KEY,
            keyLocation: KEY_LOCATION,
            urlList: links
        };

        console.log(`🚀 Submitting ${links.length} URLs for Severance Calculator to IndexNow...`);

        const endpoints = [
            'https://www.bing.com/indexnow',
            'https://yandex.com/indexnow'
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await axios.post(endpoint, payload, {
                    headers: { 'Content-Type': 'application/json' }
                });
                console.log(`✅ Successfully submitted to ${endpoint}. Status: ${response.status}`);
            } catch (error) {
                console.error(`❌ Failed to submit to ${endpoint}:`, error.message);
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

submitToIndexNow();
