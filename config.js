// Configuration file for API keys and settings
// This file should NOT contain actual secrets in the committed code.

const CONFIG = {
    // Groq API Configuration
    // READ KEY FROM ENVIRONMENT VARIABLE
    GROQ_API_KEY: process.env.GROQ_API_KEY, 
    GROQ_API_URL: "https://api.groq.com/openai/v1/chat/completions",
    // ... (rest of your Groq config) ...

    // Hadith API Configuration
    // READ KEY FROM ENVIRONMENT VARIABLE
    HADITH_API_KEY: process.env.HADITH_API_KEY, 
    HADITH_API_URL: "https://hadithapi.com/api/hadiths/",

    // ... (rest of your config is fine to keep) ...
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
