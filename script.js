 <script>
        // Global variables for Islamic Scholar AI
        let currentLanguage = 'english';
        let currentUser = null;
        let isChatStarted = false;
        let isOfflineMode = false;
        let conversationHistoryData = [];
        let offlineKnowledgeBase = {};

        // Groq API Configuration
        const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
        const GROQ_API_KEY = process.env.GROQ_API_KEY;

        // Available Groq Models
        const GROQ_MODELS = {
            "llama-4-scout": "meta-llama/llama-4-scout-17b-16e-instruct",
            "llama-3.1-8b": "llama-3.1-8b-instant",
            "llama-3.1-70b": "llama-3.1-70b-versatile"
        };

        // Hadith API Configuration
       const HADITH_API_KEY = process.env.HADITH_API_KEY;
        const HADITH_API_URL = "https://hadithapi.com/api/hadiths/";

        // Comprehensive Translation API
        const translationAPI = {
            english: {
                // Language Screen
                languageTitle: "🕌 Hassan - Islamic Hub",
                languageSubtitle: "Choose Language",
                kiswahiliBtn: "KISWAHILI",
                kiswahiliSub: "Swahili Language", 
                englishBtn: "ENGLISH",
                englishSub: "English Language",
                languageInfo1: "Choose your preferred language for all conversations",
                languageInfo2: "Choose your preferred language for all conversations",

                // Welcome Screen
                welcomeTitle: "🕌 Hassan - Islamic Hub", 
                welcomeSubtitle: "Your personal guide to Islamic knowledge",
                nameLabel: "Your Name",
                namePlaceholder: "Enter your name",
                backgroundLabel: "Your Islamic Background",
                interestLabel: "Primary Interest",
                startButton: "🤲 Start Learning - Assalamu Alaikum",
                selectLevel: "Select your level",
                beginnerOption: "Beginner - New to Islam",
                studentOption: "Student - Learning Islam",
                practicingOption: "Practicing Muslim", 
                advancedOption: "Advanced - Seeking deeper knowledge",
                selectInterest: "Select interest",
                quranOption: "Quran & Tafsir",
                hadithOption: "Hadith & Sunnah",
                fiqhOption: "Fiqh & Jurisprudence",
                aqeedahOption: "Aqeedah & Beliefs",
                seerahOption: "Seerah & History", 
                spiritualityOption: "Spirituality & Tasawwuf",

                // App Header
                appTitle: "Hassan",
                locating: "Locating...",

                // Home Tab
                nextPrayer: "Next Prayer",
                startsIn: "Starts in",
                fajr: "Fajr",
                dhuhr: "Dhuhr", 
                asr: "Asr",
                maghrib: "Maghrib",
                isha: "Isha",
                qiblaTitle: "Qibla Direction",
                qiblaDesc: "Find direction to Kaaba",
                quranTitle: "Quran",
                quranDesc: "Read and listen to Quran", 
                tasbihTitle: "Tasbih Counter",
                tasbihDesc: "Digital dhikr counter",
                hadithTitle: "Hadith Collection",
                hadithDesc: "Sahih Muslim & other hadiths",
                verseOfDay: "Verse of the Day",

                // Quran Tab
                quranSection: "The Holy Quran",
                searchQuran: "Search Quran...",
                previous: "Previous",
                random: "Random", 
                next: "Next",
                surahs: "Surahs",

                // Prayer & Qibla Tab
                prayerQiblaSection: "Prayer & Qibla",
                qiblaDirection: "Qibla Direction:",
                recalibrate: "Recalibrate",
                prayerTimesToday: "Prayer Times Today",
                sunrise: "Sunrise",

                // Tasbih Tab
                tasbihSection: "Digital Tasbih", 
                subhanallah: "SubhanAllah (33x)",
                alhamdulillah: "Alhamdulillah (33x)",
                allahuAkbar: "Allahu Akbar (33x)",
                laIlaha: "La ilaha illa Allah (100x)",
                reset: "Reset",
                islamicCalendar: "Islamic Calendar",
                allahNames: "99 Names of Allah", 
                nextName: "Next Name",

                // Hadith Tab
                hadithSection: "Hadith Collection",
                bukhari: "Sahih Bukhari",
                muslim: "Sahih Muslim", 
                abudawud: "Sunan Abi Dawud",
                tirmidhi: "Jami` at-Tirmidhi",
                nasai: "Sunan an-Nasa'i",
                ibnmajah: "Sunan Ibn Majah",
                searchHadith: "Search hadiths...",

                // Chatbot Tab
                aiScholar: "Islamic Scholar AI",
                onlineMode: "Online Mode",
                offlineMode: "Offline Mode", 
                offlineMessage: "You're using offline mode with pre-loaded Islamic knowledge",
                fivePillars: "Five Pillars",
                wuduSteps: "Wudu Steps",
                ramadan: "Ramadan",
                zakat: "Zakat",
                kindnessHadith: "Kindness Hadith",
                welcomeChat: "As-salamu alaykum! I'm your Islamic Scholar AI assistant. Please select your language to begin.",
                chatPlaceholder: "Ask your Islamic question...",

                // Navigation
                home: "Home",
                quran: "Quran", 
                prayer: "Prayer",
                hadith: "Hadith",
                aiScholarNav: "AI Scholar",

                // Modals
                surahDetails: "Surah Details",
                hadithDetails: "Hadith Details", 
                close: "Close",

                // Status Messages
                locationDetected: "Location detected",
                locationDenied: "Location access denied",
                usingDefaultLocation: "Using default location (Makkah)",
                geolocationNotSupported: "Geolocation not supported",
                usingSamplePrayerTimes: "Using sample prayer times",
                qiblaRecalibrated: "Qibla direction recalibrated",
                unableToRecalibrate: "Unable to recalibrate. Location not available.",
                errorLoadingSurah: "Error loading surah. Please try again.",
                firstVerse: "This is the first verse of the surah",
                dhikrTargetReached: "Dhikr target reached! Allahu Akbar!",
                searching: "Searching...",
                errorLoadingHadith: "Error loading hadith. Please try again.",
                noHadithsFound: "No hadiths found.",
                pleaseEnterChars: "Please enter at least 3 characters to search.",
                searchingHadiths: "Searching hadiths. This may take a moment.",
                noHadithsMatching: "No hadiths found matching your search."
            },

            kiswahili: {
                // Language Screen
                languageTitle: "🕌 Hassan - Kituo cha Kiislamu",
                languageSubtitle: "Chagua Lugha",
                kiswahiliBtn: "KISWAHILI",
                kiswahiliSub: "Lugha ya Kiswahili",
                englishBtn: "KIINGEREZA", 
                englishSub: "Lugha ya Kiingereza",
                languageInfo1: "Chagua lugha unayopendelea kwa mazungumzo yote",
                languageInfo2: "Chagua lugha unayopendelea kwa mazungumzo yote",

                // Welcome Screen
                welcomeTitle: "🕌 Hassan - Kituo cha Kiislamu",
                welcomeSubtitle: "Mwongozo wako binafsi wa elimu ya Kiislamu",
                nameLabel: "Jina Lako",
                namePlaceholder: "Weka jina lako",
                backgroundLabel: "Msingi Wako wa Kiislamu",
                interestLabel: "Masilahi ya Msingi", 
                startButton: "🤲 Anza Kujifunza - Assalamu Alaikum",
                selectLevel: "Chagua kiwango chako",
                beginnerOption: "Mwanzo - Mpya kwenye Uislamu",
                studentOption: "Mwanafunzi - Anajifunza Uislamu",
                practicingOption: "Mwislamu Anayetumika",
                advancedOption: "Wa hali ya Juu - Anatafuta maarifa zaidi",
                selectInterest: "Chagua masilahi",
                quranOption: "Quran & Tafsir",
                hadithOption: "Hadith & Sunnah",
                fiqhOption: "Fiqh & Sheria",
                aqeedahOption: "Aqeedah & Imani",
                seerahOption: "Seerah & Historia", 
                spiritualityOption: "Uroho & Tasawwuf",

                // App Header
                appTitle: "Hassan",
                locating: "Inapata eneo...",

                // Home Tab
                nextPrayer: "Sala Inayofuata",
                startsIn: "Inaanza kwa",
                fajr: "Alfajiri",
                dhuhr: "Aladhuri", 
                asr: "Alasiri",
                maghrib: "Magharibi",
                isha: "Isha",
                qiblaTitle: "Mwelekeo wa Qibla",
                qiblaDesc: "Tafuta mwelekeo wa Kaaba",
                quranTitle: "Quran",
                quranDesc: "Soma na sikiliza Quran", 
                tasbihTitle: "Kichanganuzi cha Tasbih",
                tasbihDesc: "Kichanganuzi cha digital cha dhikr",
                hadithTitle: "Mkusanyiko wa Hadith",
                hadithDesc: "Sahih Muslim na hadith nyingine",
                verseOfDay: "Aya ya Siku",

                // Quran Tab
                quranSection: "Quran Takatifu",
                searchQuran: "Tafuta Quran...",
                previous: "Kabla",
                random: "Nasibu", 
                next: "Ijayo",
                surahs: "Sura",

                // Prayer & Qibla Tab
                prayerQiblaSection: "Sala & Qibla",
                qiblaDirection: "Mwelekeo wa Qibla:",
                recalibrate: "Rekebisha tena",
                prayerTimesToday: "Nyakati za Sala Leo",
                sunrise: "Mapambazuko",

                // Tasbih Tab
                tasbihSection: "Tasbih ya Digital", 
                subhanallah: "SubhanAllah (33x)",
                alhamdulillah: "Alhamdulillah (33x)",
                allahuAkbar: "Allahu Akbar (33x)",
                laIlaha: "La ilaha illa Allah (100x)",
                reset: "Weka upya",
                islamicCalendar: "Kalenda ya Kiislamu",
                allahNames: "Majina 99 ya Allah", 
                nextName: "Jina Linalofuata",

                // Hadith Tab
                hadithSection: "Mkusanyiko wa Hadith",
                bukhari: "Sahih Bukhari",
                muslim: "Sahih Muslim", 
                abudawud: "Sunan Abi Dawud",
                tirmidhi: "Jami` at-Tirmidhi",
                nasai: "Sunan an-Nasa'i",
                ibnmajah: "Sunan Ibn Majah",
                searchHadith: "Tafuta hadith...",

                // Chatbot Tab
                aiScholar: "AI Mwanasheria wa Kiislamu",
                onlineMode: "Hali ya Mtandaoni",
                offlineMode: "Hali ya Nje ya Mtandao", 
                offlineMessage: "Unatumia hali ya nje ya mtandao na maarifa ya Kiislamu yaliyopakiwa",
                fivePillars: "Nguzo Tano",
                wuduSteps: "Hatua za Wudu",
                ramadan: "Ramadan",
                zakat: "Zakat",
                kindnessHadith: "Hadith ya Uwema",
                welcomeChat: "As-salamu alaykum! Mimi ni msaidizi wako wa AI Mwanasheria wa Kiislamu. Tafadhali chagua lugha yako kuanza.",
                chatPlaceholder: "Uliza swali lako la Kiislamu...",

                // Navigation
                home: "Nyumbani",
                quran: "Quran", 
                prayer: "Sala",
                hadith: "Hadith",
                aiScholarNav: "AI Mwanasheria",

                // Modals
                surahDetails: "Maelezo ya Sura",
                hadithDetails: "Maelezo ya Hadith", 
                close: "Funga",

                // Status Messages
                locationDetected: "Eneo limegunduliwa",
                locationDenied: "Ufikiaji wa eneo umekataliwa",
                usingDefaultLocation: "Inatumia eneo la chaguomsingi (Makkah)",
                geolocationNotSupported: "Uchambuzi wa eneo hauna usaidizi",
                usingSamplePrayerTimes: "Inatumia nyakati za mfano za sala",
                qiblaRecalibrated: "Mwelekeo wa Qibla umerekebishwa tena",
                unableToRecalibrate: "Haiwezi kurekebisha tena. Eneo halipatikani.",
                errorLoadingSurah: "Hitilafu katika kupakia sura. Tafadhali jaribu tena.",
                firstVerse: "Hii ni aya ya kwanza ya sura",
                dhikrTargetReached: "Lengo la dhikr limefikiwa! Allahu Akbar!",
                searching: "Inatafuta...",
                errorLoadingHadith: "Hitilafu katika kupakia hadith. Tafadhali jaribu tena.",
                noHadithsFound: "Hakuna hadith zilizopatikana.",
                pleaseEnterChars: "Tafadhali weka herufi angalau 3 kutafuta.",
                searchingHadiths: "Inatafuta hadith. Huenda ichukue muda.",
                noHadithsMatching: "Hakuna hadith zilizopatikana zinazolingana na utafutaji wako."
            }
        };

        // Global variables for Hassan
        let currentVerse = 1;
        let currentSurah = 1;
        let dhikrCount = 0;
        let dhikrTarget = 33;
        let allahNamesIndex = 0;
        let prayerTimes = {};
        let prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        let nextPrayerTimer;
        let userLocation = null;
        let qiblaDirection = 0;
        let allSurahs = [];
        let currentHadithCollection = "bukhari";
        const TOTAL_SURAH = 114;

        // API Endpoints
        const QURAN_API = "https://api.alquran.cloud/v1";
        const PRAYER_API = "https://api.aladhan.com/v1";
        const HIJRI_API = "https://api.aladhan.com/v1/gToH";
        const QURAN_AUDIO_API = "https://cdn.islamic.network/quran/audio/128";

        // Mock Data for Quran and Allah's Names
        const MOCK_QURAN_DATA = {
            surahs: [
                { number: 1, englishName: "Al-Fatihah", name: "الفاتحة", englishNameTranslation: "The Opener", numberOfAyahs: 7, revelationType: "Meccan" },
                { number: 2, englishName: "Al-Baqarah", name: "البقرة", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan" },
                { number: 36, englishName: "Ya-Sin", name: "يس", englishNameTranslation: "Ya Sin", numberOfAyahs: 83, revelationType: "Meccan" },
                { number: 55, englishName: "Ar-Rahman", name: "الرحمن", englishNameTranslation: "The Beneficent", numberOfAyahs: 78, revelationType: "Medinan" },
                { number: 67, englishName: "Al-Mulk", name: "الملك", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan" },
                { number: 112, englishName: "Al-Ikhlas", name: "الإخلاص", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "Meccan" },
                { number: 113, englishName: "Al-Falaq", name: "الفلق", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan" },
                { number: 114, englishName: "An-Nas", name: "الناس", englishNameTranslation: "Mankind", numberOfAyahs: 6, revelationType: "Meccan" }
            ]
        };

        const MOCK_ALLAH_NAMES = [
            { arabic: "الرَّحْمَنُ", english: "Ar-Rahman", meaning: "The Beneficent" },
            { arabic: "الرَّحِيمُ", english: "Ar-Rahim", meaning: "The Merciful" },
            { arabic: "الْمَلِكُ", english: "Al-Malik", meaning: "The Eternal Lord" },
            { arabic: "الْقُدُّوسُ", english: "Al-Quddus", meaning: "The Most Sacred" },
            { arabic: "السَّلاَمُ", english: "As-Salam", meaning: "The Source of Peace" },
            { arabic: "الْمُؤْمِنُ", english: "Al-Mu'min", meaning: "The Inspirer of Faith" },
            { arabic: "الْمُهَيْمِنُ", english: "Al-Muhaymin", meaning: "The Guardian" },
            { arabic: "الْعَزِيزُ", english: "Al-Aziz", meaning: "The Almighty" },
            { arabic: "الْجَبَّارُ", english: "Al-Jabbar", meaning: "The Compeller" },
            { arabic: "الْمُتَكَبِّرُ", english: "Al-Mutakabbir", meaning: "The Supreme" }
        ];

        // Function to apply translations
        function applyTranslations(language) {
            const translations = translationAPI[language];
            
            // Translate all elements with data-translate attribute
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[key]) {
                    element.textContent = translations[key];
                }
            });
            
            // Translate all placeholder elements
            document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
                const key = element.getAttribute('data-translate-placeholder');
                if (translations[key]) {
                    element.placeholder = translations[key];
                }
            });
            
            // Update language switcher active state
            document.getElementById('lang-en-btn').classList.toggle('active', language === 'english');
            document.getElementById('lang-sw-btn').classList.toggle('active', language === 'kiswahili');
            
            // Update chat input placeholder if chat is started
            if (isChatStarted) {
                document.getElementById('chat-input').placeholder = translations.chatPlaceholder;
            }
        }

        // Function to switch language after initial selection
        function switchLanguage(language) {
            currentLanguage = language;
            localStorage.setItem('selectedLanguage', language);
            applyTranslations(language);
            
            // Update chatbot if started
            if (isChatStarted) {
                updateChatbotLanguage();
            }
            
            showToast(language === 'english' ? 'Language switched to English' : 'Lugha imebadilishwa kuwa Kiswahili', 'success');
        }

        // Function to update chatbot language
        function updateChatbotLanguage() {
            if (conversationHistoryData.length > 0) {
                // Update system message with new language
                conversationHistoryData[0] = createSystemMessage();
            }
        }

        // Language selection function
        function selectLanguage(language) {
            currentLanguage = language;
            localStorage.setItem('selectedLanguage', language);
            document.getElementById('language-screen').style.display = 'none';
            document.getElementById('welcome-screen').style.display = 'flex';
            document.getElementById('language-switcher').style.display = 'block';
            
            applyTranslations(language);
        }

        // Create system message for Groq API
        function createSystemMessage() {
            const systemPrompts = {
                english: `You are an Islamic Scholar AI Assistant. You provide authentic, evidence-based Islamic knowledge in English.

USER PROFILE:
- Name: ${currentUser.name}
- Background: ${currentUser.background}
- Primary Interest: ${currentUser.interest}
- Language: English

CRITICAL INSTRUCTIONS:
1. ALWAYS provide Arabic text for Quran verses followed by English translation
2. ALWAYS provide Arabic text for Hadith followed by English translation
3. Use proper Quranic references: "Quran X:Y"
4. Use proper Hadith references: "Sahih Bukhari X", "Sahih Muslim X", etc.
5. Be compassionate, educational, and clear
6. Only answer questions about Islamic topics
7. For non-Islamic topics, politely redirect to Islamic knowledge

RESPONSE FORMAT:
- For Quran: Arabic text → English translation → Reference
- For Hadith: Arabic text → English translation → Reference
- Use authentic Islamic terminology

Always maintain the character of a knowledgeable Islamic scholar.`,

                kiswahili: `Wewe ni Msaidizi wa AI wa Mwanasheria wa Kiislamu. Unatoa elimu ya Kiislamu halisi, yenye kuthibitishwa kwa Kiswahili.

PROFAILI YA MTUMIAJI:
- Jina: ${currentUser.name}
- Msingi: ${currentUser.background}
- Masilahi ya Msingi: ${currentUser.interest}
- Lugha: Kiswahili

MAELEKEZO MUHIMU:
1. DAIMA toa maandishi ya Kiarabu kwa aya za Quran ikifuatiwa na tafsiri ya Kiswahili
2. DAIMA toa maandishi ya Kiarabu kwa Hadith ikifuatiwa na tafsiri ya Kiswahili
3. Tumia marejeo sahihi ya Quran: "Quran X:Y"
4. Tumia marejeo sahihi ya Hadith: "Sahih Bukhari X", "Sahih Muslim X", n.k.
5. Kuwa na huruma, ya kielimu, na wazi
6. Jibu maswali tu kuhusu mada za Kiislamu
7. Kwa mada zisizo za Kiislamu, elekeza kwa upole kwenye elimu ya Kiislamu

MUUNDO WA MAJIBU:
- Kwa Quran: Maandishi ya Kiarabu → Tafsiri ya Kiswahili → Rejea
- Kwa Hadith: Maandishi ya Kiarabu → Tafsiri ya Kiswahili → Rejea
- Tumia istilahi za hakika za Kiislamu

Daima dumia tabia ya mwanasheria mwenye maarifa wa Kiislamu.`
            };

            return {
                role: "system",
                content: systemPrompts[currentLanguage]
            };
        }

        // Start chat function
        function startChat() {
            const userName = document.getElementById('user-name').value.trim();
            const userBackground = document.getElementById('user-background').value;
            const userInterest = document.getElementById('user-interest').value;
            
            if (!userName) {
                alert(currentLanguage === 'english' ? 'Please enter your name to begin.' : 'Tafadhali weka jina lako kuanza.');
                return;
            }
            
            if (!userBackground) {
                alert(currentLanguage === 'english' ? 'Please select your Islamic background.' : 'Tafadhali chagua msingi wako wa Kiislamu.');
                return;
            }
            
            if (!userInterest) {
                alert(currentLanguage === 'english' ? 'Please select your primary interest.' : 'Tafadhali chagua masilahi yako ya msingi.');
                return;
            }
            
            try {
                // Create user profile
                currentUser = {
                    id: 1,
                    name: userName,
                    background: userBackground,
                    interest: userInterest,
                    language: currentLanguage
                };
                
                // Hide welcome screen
                document.getElementById('welcome-screen').style.display = 'none';
                isChatStarted = true;
                
                // Initialize conversation history with system message
                conversationHistoryData = [createSystemMessage()];
                
                // Enable chat input
                document.getElementById('chat-input').disabled = false;
                document.getElementById('chat-input').placeholder = translationAPI[currentLanguage].chatPlaceholder;
                document.getElementById('send-button').disabled = false;
                
                // Show mode toggle
                document.getElementById('mode-toggle').style.display = 'flex';
                
                // Build search index for offline knowledge base
                buildSearchIndex();
                
                // Add welcome message
                addChatMessage(getInitialGreeting(), 'bot');
                
            } catch (error) {
                console.error('Failed to start chat:', error);
                alert(currentLanguage === 'english' ? 'Failed to initialize chat. Please try again.' : 'Imeshindwa kuanzisha gumzo. Tafadhali jaribu tena.');
            }
        }

        // Send message to Groq API
        async function sendChatMessage() {
            if (!isChatStarted) {
                alert(currentLanguage === 'english' ? 'Please complete the setup first.' : 'Tafadhali kamilisha usanidi kwanza.');
                return;
            }
            
            const input = document.getElementById('chat-input');
            const message = input.value.trim();
            
            if (!message) return;

            // Add user message to chat
            addChatMessage(message, 'user');
            input.value = '';
            
            // Check if we should use offline mode
            if (isOfflineMode || !navigator.onLine) {
                // Use offline knowledge base
                processOfflineMessage(message);
            } else {
                // Use online API
                processOnlineMessage(message);
            }
        }

        // Process message using offline knowledge base
        function processOfflineMessage(message) {
            showTypingIndicator();
            
            // Simulate processing delay
            setTimeout(() => {
                const response = findOfflineResponse(message);
                addChatMessage(response, 'bot');
                hideTypingIndicator();
                
                // Add to conversation history for continuity
                conversationHistoryData.push({
                    role: "user",
                    content: message
                });
                conversationHistoryData.push({
                    role: "assistant",
                    content: response
                });
            }, 1500);
        }

        // Process message using online API
        async function processOnlineMessage(message) {
            // Add to conversation history
            conversationHistoryData.push({
                role: "user",
                content: message
            });
            
            showTypingIndicator();
            document.getElementById('send-button').disabled = true;
            
            try {
                const response = await fetch(GROQ_API_URL, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${GROQ_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        messages: conversationHistoryData,
                        model: GROQ_MODELS["llama-4-scout"],
                        temperature: 0.7,
                        max_tokens: 2048,
                        top_p: 0.9,
                        stream: false
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }
                
                const data = await response.json();
                
                let botResponse = currentLanguage === 'english' ? 
                    "I'm having trouble processing your request. Please try again." :
                    "Nina shida kubana ombi lako. Tafadhali jaribu tena.";
                    
                if (data?.choices?.[0]?.message) {
                    botResponse = data.choices[0].message.content;
                    
                    // Add to conversation history
                    conversationHistoryData.push({
                        role: "assistant",
                        content: botResponse
                    });
                    
                    // Limit conversation history
                    if (conversationHistoryData.length > 12) {
                        conversationHistoryData = [
                            conversationHistoryData[0],
                            ...conversationHistoryData.slice(-10)
                        ];
                    }
                }
                
                addChatMessage(botResponse, 'bot');
                
            } catch (error) {
                console.error("API Error:", error);
                
                // Fallback to offline mode on API error
                const fallbackMessage = currentLanguage === 'english' ?
                    "I'm experiencing connection issues. Switching to offline mode with pre-loaded Islamic knowledge." :
                    "Nina matatizo ya muunganisho. Nimebadilisha kwa hali ya nje ya mtandao na maarifa ya Kiislamu yaliyopakiwa.";
                
                addChatMessage(fallbackMessage, 'bot');
                switchToOfflineMode();
                processOfflineMessage(message);
            } finally {
                hideTypingIndicator();
                document.getElementById('send-button').disabled = false;
            }
        }

        // Build search index for better offline matching
        function buildSearchIndex() {
            offlineKnowledgeBase = {};
            
            // Flatten the knowledge base for easier searching
            Object.keys(islamicKnowledgeBase).forEach(category => {
                Object.keys(islamicKnowledgeBase[category]).forEach(question => {
                    const entry = islamicKnowledgeBase[category][question];
                    // Create multiple search keys for better matching
                    const keywords = question.toLowerCase().split(' ');
                    keywords.forEach(keyword => {
                        if (!offlineKnowledgeBase[keyword]) {
                            offlineKnowledgeBase[keyword] = [];
                        }
                        offlineKnowledgeBase[keyword].push(entry);
                    });
                });
            });
        }

        // Find response in offline knowledge base
        function findOfflineResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Direct matches
            for (const category in islamicKnowledgeBase) {
                for (const question in islamicKnowledgeBase[category]) {
                    if (lowerMessage.includes(question)) {
                        return islamicKnowledgeBase[category][question].response;
                    }
                }
            }
            
            // Keyword matching
            const keywords = lowerMessage.split(' ');
            let bestMatch = null;
            let bestScore = 0;
            
            for (const category in islamicKnowledgeBase) {
                for (const question in islamicKnowledgeBase[category]) {
                    let score = 0;
                    keywords.forEach(keyword => {
                        if (question.includes(keyword) || keyword.length > 3 && offlineKnowledgeBase[keyword]) {
                            score += keyword.length;
                        }
                    });
                    
                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = islamicKnowledgeBase[category][question];
                    }
                }
            }
            
            if (bestMatch && bestScore > 2) {
                return bestMatch.response;
            }
            
            // Fallback responses
            const fallbackResponses = {
                english: `I understand you're asking about "${message}". In offline mode, my knowledge is limited to pre-loaded Islamic content.

Here are some topics I can help with in offline mode:
• Quran and its teachings
• Prayer (Salah) and purification
• Five Pillars of Islam
• Prophets in Islam
• Basic Islamic beliefs

Would you like to ask about any of these topics, or switch to online mode for more comprehensive answers?`,

                kiswahili: `Ninaelewa unauliza kuhusu "${message}". Katika hali ya nje ya mtandao, ujuzi wangu ni mdogo kwa maudhui ya Kiislamu yaliyopakiwa.

Hapa kuna mada ninazoweza kusaidia katika hali ya nje ya mtandao:
• Quran na mafundisho yake
• Sala (Salah) na usafi
• Nguzo tano za Uislamu
• Manabii katika Uislamu
• Imani za msingi za Kiislamu

Je, ungependa kuuliza kuhusu moja ya mada hizi, au ubadilishe kwa hali ya mtandaoni kwa majibu kamili zaidi?`
            };
            
            return fallbackResponses[currentLanguage];
        }

        // Switch to offline mode
        function switchToOfflineMode() {
            isOfflineMode = true;
            document.getElementById('online-mode-btn').classList.remove('active');
            document.getElementById('offline-mode-btn').classList.add('active');
            document.getElementById('offline-indicator').style.display = 'flex';
        }

        // Switch to online mode
        function switchToOnlineMode() {
            isOfflineMode = false;
            document.getElementById('online-mode-btn').classList.add('active');
            document.getElementById('offline-mode-btn').classList.remove('active');
            document.getElementById('offline-indicator').style.display = 'none';
        }

        // Add chat message
        function addChatMessage(message, sender) {
            const chatMessages = document.getElementById('chat-messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${sender}-message`;
            
            // Format message with Islamic styling
            let formattedMessage = formatIslamicMessage(message);
            
            messageDiv.innerHTML = `<p>${formattedMessage}</p>`;
            
            chatMessages.appendChild(messageDiv);

            // Scroll to bottom
            scrollChatToBottom();

            return messageDiv;
        }

        // Format Islamic message with proper styling
        function formatIslamicMessage(message) {
            // Improved Arabic text detection and formatting
            // This regex looks for Arabic text blocks
            const arabicRegex = /([\u0600-\u06FF\s]+)/g;
            
            // Replace Arabic text with properly formatted divs
            message = message.replace(arabicRegex, (match) => {
                // Check if this is likely to be Arabic text (not just a few characters)
                if (match.trim().length > 3 && /[\u0600-\u06FF]/.test(match)) {
                    return `<div class="arabic-text-container"><div class="arabic-text">${match}</div></div>`;
                }
                return match;
            });
            
            // Add Quran verse styling
            message = message.replace(/\*\*Arabic:\*\*\s*([^\n]+)/g, 
                '<div class="arabic-text-container"><div class="arabic-text"><strong>Arabic:</strong><br>$1</div></div>');
            
            message = message.replace(/\*\*Translation:\*\*\s*"([^"]+)"/g, 
                '<div class="arabic-translation"><strong>Translation:</strong> "$1"</div>');
            
            message = message.replace(/\*\*Reference:\*\*\s*([^\n]+)/g, 
                '<div class="citation-box"><strong>Reference:</strong> $1</div>');
            
            // Add quick action buttons for common follow-up questions
            const quickActions = currentLanguage === 'english' ? 
                `<div class="quick-actions">
                    <button class="quick-action-btn" onclick="askFollowUp('explain_more')">Explain More</button>
                    <button class="quick-action-btn" onclick="askFollowUp('examples')">Give Examples</button>
                    <button class="quick-action-btn" onclick="askFollowUp('evidence')">Show Evidence</button>
                </div>` :
                `<div class="quick-actions">
                    <button class="quick-action-btn" onclick="askFollowUp('explain_more')">Elezea Zaidi</button>
                    <button class="quick-action-btn" onclick="askFollowUp('examples')">Toa Mfano</button>
                    <button class="quick-action-btn" onclick="askFollowUp('evidence')">Onyesha Ushahidi</button>
                </div>`;
            
            // Add quick actions to bot messages (but not to the first welcome message)
            if (!message.includes('Assalamu Alaikum') && !message.includes('As-salamu alaykum')) {
                message += quickActions;
            }
            
            return message;
        }

        // Show typing indicator
        function showTypingIndicator() {
            const chatMessages = document.getElementById('chat-messages');
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span>${currentLanguage === 'english' ? 'Researching Islamic knowledge...' : 'Inatafuta elimu ya Kiislamu...'}</span>
            `;
            chatMessages.appendChild(typingDiv);
            scrollChatToBottom();
        }

        // Hide typing indicator
        function hideTypingIndicator() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        // Scroll chat to bottom
        function scrollChatToBottom() {
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Ask quick question
        function askQuickQuestion(type) {
            if (!isChatStarted) {
                alert(currentLanguage === 'english' ? 'Please complete the setup first.' : 'Tafadhali kamilisha usanidi kwanza.');
                return;
            }
            
            const questions = {
                english: {
                    pillars: "What are the five pillars of Islam?",
                    wudu: "How to perform wudu?",
                    ramadan: "Tell me about Ramadan",
                    zakat: "What is Zakat?",
                    kindness: "Tell me a hadith about kindness"
                },
                kiswahili: {
                    pillars: "Je, ni nguzo gani tano za Uislamu?",
                    wudu: "Je, unafanyaje wudu?",
                    ramadan: "Niambie kuhusu Ramadan",
                    zakat: "Zakat ni nini?",
                    kindness: "Niambie hadith kuhusu wema"
                }
            };
            
            const question = questions[currentLanguage][type];
            if (question) {
                document.getElementById('chat-input').value = question;
                sendChatMessage();
            }
        }

        // Ask follow-up question
        function askFollowUp(type) {
            const questions = {
                english: {
                    explain_more: "Can you explain this in more detail?",
                    examples: "Can you provide some practical examples?",
                    evidence: "What is the Islamic evidence for this?"
                },
                kiswahili: {
                    explain_more: "Unaweza kuelezea hili kwa undani zaidi?",
                    examples: "Unaweza kutoa mifano ya vitendo?",
                    evidence: "Ni ushahidi gani wa Kiislamu kwa hili?"
                }
            };
            
            const question = questions[currentLanguage][type];
            if (question) {
                document.getElementById('chat-input').value = question;
                sendChatMessage();
            }
        }

        // Get initial greeting
        function getInitialGreeting() {
            const greetings = {
                english: {
                    'beginner': `Assalamu Alaikum ${currentUser.name}! Welcome to your journey in learning Islam. It's beautiful that you're seeking knowledge. Remember the Prophet (PBUH) said: "Seeking knowledge is obligatory upon every Muslim." How can I help you begin?`,
                    'student': `Assalamu Alaikum ${currentUser.name}! May Allah bless your pursuit of knowledge. As a student of Islam, you're following the path of the Sahaba. What aspect of Islamic knowledge would you like to explore today?`,
                    'practicing': `Assalamu Alaikum wa Rahmatullahi wa Barakatuh ${currentUser.name}! May Allah accept your worship and increase you in knowledge. How can I assist you in deepening your understanding of Islam today?`,
                    'advanced': `Assalamu Alaikum ${currentUser.name}! TabarakAllah, seeking advanced knowledge is highly rewarded. The Prophet (PBUH) said: "Allah makes the way to Jannah easy for him who treads the path in search of knowledge." What complex topic shall we explore?`
                },
                kiswahili: {
                    'beginner': `Assalamu Alaikum ${currentUser.name}! Karibu kwenye safari yako ya kujifunza Uislamu. Ni jambo zuri kwamba unatafuta elimu. Kumbuka Mtume (SAW) alisema: "Kutafuta elimu ni wajibu kwa kila Mwislamu." Ninawezaje kukusaidia kuanza?`,
                    'student': `Assalamu Alaikum ${currentUser.name}! Mungu akubariki katika harakati zako za kutafuta elimu. Kama mwanafunzi wa Uislamu, unafuata njia ya Sahaba. Ni upi uwanja wa elimu ya Kiislamu ungependa kuchunguza leo?`,
                    'practicing': `Assalamu Alaikum wa Rahmatullahi wa Barakatuh ${currentUser.name}! Mungu akubali ibada yako na akuzidishe katika elimu. Ninawezaje kukusaidia kukamilisha uelewa wako wa Uislamu leo?`,
                    'advanced': `Assalamu Alaikum ${currentUser.name}! TabarakAllah, kutafuta elimu ya hali ya juu kunalipwa sana. Mtume (SAW) alisema: "Mungu hufanya njia ya Jannah iwe rahisi kwa yeye anayetembea njia ya kutafuta elimu." Ni mada gani ngumu tutakayochunguza?`
                }
            };
            
            return greetings[currentLanguage][currentUser.background] || 
                (currentLanguage === 'english' ? 
                    `Assalamu Alaikum ${currentUser.name}! Welcome to your Islamic learning assistant. How can I help you today?` :
                    `Assalamu Alaikum ${currentUser.name}! Karibu kwa msaidizi wako wa kujifunza Kiislamu. Ninawezaje kukusaidia leo?`);
        }

        // Handle chat input
        function handleChatInput(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        }

        // Initialize the app
        function initializeApp() {
            updateDateTime();
            setInterval(updateDateTime, 60000); // Update every minute
            
            getUserLocation();
            loadDailyVerse();
            loadSurahList();
            loadAllahNames();
            loadIslamicCalendar();
            loadHadithBooks();
            
            // Set up search functionality
            document.getElementById('quran-search').addEventListener('input', handleQuranSearch);
            
            // Initial Qibla display
            document.getElementById('qibla-arrow').style.transform = `translateX(-50%) rotate(${qiblaDirection}deg)`;

            // Initial Tasbih target
            dhikrTarget = parseInt(document.getElementById('dhikr-type').value);
            
            // Setup device orientation for compass
            setupCompass();
        }

        // Setup bottom navigation
        function setupNavigation() {
            const navItems = document.querySelectorAll('.nav-item');
            
            navItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    switchTab(this.getAttribute('data-tab'));
                });
            });
        }

        // Setup hadith collection selector
        function setupHadithCollectionSelector() {
            const collectionBtns = document.querySelectorAll('.collection-btn');
            
            collectionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    collectionBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Update current collection
                    currentHadithCollection = this.getAttribute('data-collection');
                    
                    // Load books for the selected collection
                    loadHadithBooks();
                });
            });
        }

        // Setup Islamic Scholar AI
        function setupIslamicScholarAI() {
            // Set up mode toggle
            document.getElementById('online-mode-btn').addEventListener('click', switchToOnlineMode);
            document.getElementById('offline-mode-btn').addEventListener('click', switchToOfflineMode);
            
            // Set up chat input
            document.getElementById('chat-input').addEventListener('keypress', handleChatInput);
            
            // Set up start chat button
            document.getElementById('start-chat-btn').addEventListener('click', startChat);
            
            // Check initial online status
            if (!navigator.onLine) {
                switchToOfflineMode();
            }
        }

        // Setup compass functionality
        function setupCompass() {
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', function(event) {
                    const compass = event.alpha; // 0-360 degrees
                    if (compass !== null) {
                        // Adjust for device orientation
                        let adjustedCompass = compass;
                        if (window.orientation === 90) {
                            adjustedCompass = (compass + 90) % 360;
                        } else if (window.orientation === -90) {
                            adjustedCompass = (compass - 90) % 360;
                        }
                        
                        // Calculate the arrow rotation based on Qibla direction and device orientation
                        const arrowRotation = (360 - adjustedCompass + qiblaDirection) % 360;
                        document.getElementById('qibla-arrow').style.transform = `translateX(-50%) rotate(${arrowRotation}deg)`;
                    }
                }, true);
            } else {
                console.log('Device orientation not supported');
            }
        }

        // Switch to specific tab
        function switchTab(tabId) {
            // Update navigation
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            document.querySelector(`.nav-item[data-tab="${tabId}"]`).classList.add('active');
            
            // Update tab content
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        }

        // Display Toast Notification
        function showToast(message, type = 'info') {
            // Remove existing toasts
            const existingToasts = document.querySelectorAll('.toast');
            existingToasts.forEach(toast => toast.remove());
            
            let toast = document.createElement('div');
            toast.classList.add('toast');
            if (type === 'error') {
                toast.style.backgroundColor = '#dc3545';
            } else if (type === 'success') {
                toast.style.backgroundColor = '#28a745';
            }
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 3000);
        }

        // Update current date and time
        function updateDateTime() {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
            
            // Update Hijri date
            updateHijriDate(now);
        }
        
        // Update Hijri date
        function updateHijriDate(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            
            fetch(`${HIJRI_API}/${day}-${month}-${year}`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    const hijri = data.data.hijri;
                    document.getElementById('hijri-date').textContent = 
                        `${hijri.day} ${hijri.month.en} ${hijri.year} AH`;
                })
                .catch(error => {
                    console.error('Error fetching Hijri date:', error);
                    document.getElementById('hijri-date').textContent = 'Hijri date unavailable';
                });
        }

        // Get user location for prayer times
        function getUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        userLocation = { lat: lat, lng: lon };
                        document.getElementById('location-display').textContent = translationAPI[currentLanguage].locationDetected;
                        fetchPrayerTimes(lat, lon);
                        calculateQiblaDirection(lat, lon);
                    },
                    error => {
                        console.error('Geolocation error:', error);
                        document.getElementById('location-display').textContent = translationAPI[currentLanguage].locationDenied;
                        // Default to Makkah
                        userLocation = { lat: 21.4225, lng: 39.8262 };
                        fetchPrayerTimes(21.4225, 39.8262);
                        document.getElementById('qibla-degrees').textContent = '0';
                        showToast(translationAPI[currentLanguage].usingDefaultLocation, 'error');
                    }
                );
            } else {
                document.getElementById('location-display').textContent = translationAPI[currentLanguage].geolocationNotSupported;
                userLocation = { lat: 21.4225, lng: 39.8262 }; // Default to Makkah
                fetchPrayerTimes(21.4225, 39.8262);
            }
        }

        // Fetch prayer times from API
        async function fetchPrayerTimes(lat, lon) {
            const date = new Date();
            const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            
            try {
                const response = await fetch(`${PRAYER_API}/timings/${today}?latitude=${lat}&longitude=${lon}&method=2`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                
                const timings = data.data.timings;
                prayerTimes = {
                    Fajr: timings.Fajr,
                    Sunrise: timings.Sunrise,
                    Dhuhr: timings.Dhuhr,
                    Asr: timings.Asr,
                    Maghrib: timings.Maghrib,
                    Isha: timings.Isha
                };
                
                updatePrayerTimesDisplay();
                calculateNextPrayer();
            } catch (error) {
                console.error('Error fetching prayer times:', error);
                // Fallback to sample prayer times
                prayerTimes = {
                    Fajr: "05:30",
                    Sunrise: "06:45",
                    Dhuhr: "12:30",
                    Asr: "15:45",
                    Maghrib: "18:20",
                    Isha: "19:45"
                };
                updatePrayerTimesDisplay();
                calculateNextPrayer();
                showToast(translationAPI[currentLanguage].usingSamplePrayerTimes, 'error');
            }
        }
        
        // Update prayer times display
        function updatePrayerTimesDisplay() {
            document.getElementById('fajr-time').textContent = prayerTimes.Fajr;
            document.getElementById('dhuhr-time').textContent = prayerTimes.Dhuhr;
            document.getElementById('asr-time').textContent = prayerTimes.Asr;
            document.getElementById('maghrib-time').textContent = prayerTimes.Maghrib;
            document.getElementById('isha-time').textContent = prayerTimes.Isha;
            
            // Update detailed prayer times in prayer tab
            document.getElementById('prayer-fajr').textContent = prayerTimes.Fajr;
            document.getElementById('prayer-sunrise').textContent = prayerTimes.Sunrise;
            document.getElementById('prayer-dhuhr').textContent = prayerTimes.Dhuhr;
            document.getElementById('prayer-asr').textContent = prayerTimes.Asr;
            document.getElementById('prayer-maghrib').textContent = prayerTimes.Maghrib;
            document.getElementById('prayer-isha').textContent = prayerTimes.Isha;
        }
        
        // Calculate next prayer and countdown
        function calculateNextPrayer() {
            const now = new Date();
            const currentTime = now.getHours() * 60 + now.getMinutes();
            
            const prayers = [
                { name: 'Fajr', time: prayerTimes.Fajr },
                { name: 'Dhuhr', time: prayerTimes.Dhuhr },
                { name: 'Asr', time: prayerTimes.Asr },
                { name: 'Maghrib', time: prayerTimes.Maghrib },
                { name: 'Isha', time: prayerTimes.Isha }
            ];
            
            // Reset active prayer cards
            document.querySelectorAll('.prayer-time-card').forEach(card => {
                card.classList.remove('active');
            });
            
            let nextPrayer = null;
            let nextPrayerTime = null;
            
            for (const prayer of prayers) {
                const [hours, minutes] = prayer.time.split(':').map(Number);
                const prayerTime = hours * 60 + minutes;
                
                if (prayerTime > currentTime) {
                    nextPrayer = prayer;
                    nextPrayerTime = prayerTime;
                    break;
                }
            }
            
            // If no prayer found for today, use Fajr tomorrow
            if (!nextPrayer) {
                nextPrayer = { name: 'Fajr', time: prayerTimes.Fajr };
                nextPrayerTime = 24 * 60 + (parseInt(prayerTimes.Fajr.split(':')[0]) * 60 + parseInt(prayerTimes.Fajr.split(':')[1]));
            }
            
            // Update next prayer banner
            document.getElementById('next-prayer-name').textContent = nextPrayer.name;
            
            // Calculate time until next prayer
            const timeUntilPrayer = nextPrayerTime - currentTime;
            const hours = Math.floor(timeUntilPrayer / 60);
            const minutes = timeUntilPrayer % 60;
            
            document.getElementById('next-prayer-time').textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
            // Highlight current prayer card
            document.getElementById(`${nextPrayer.name.toLowerCase()}-card`).classList.add('active');
            
            // Update countdown every minute
            clearInterval(nextPrayerTimer);
            nextPrayerTimer = setInterval(calculateNextPrayer, 60000);
        }
        
        // Calculate Qibla direction
        function calculateQiblaDirection(lat, lon) {
            const KAABA_LAT = 21.4225;
            const KAABA_LON = 39.8262;
            
            const latRad = lat * Math.PI / 180;
            const lonRad = lon * Math.PI / 180;
            const kaabaLatRad = KAABA_LAT * Math.PI / 180;
            const kaabaLonRad = KAABA_LON * Math.PI / 180;
            
            const y = Math.sin(kaabaLonRad - lonRad);
            const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLonRad - lonRad);
            
            let qiblaBearing = Math.atan2(y, x) * 180 / Math.PI;
            if (qiblaBearing < 0) qiblaBearing += 360;
            
            qiblaDirection = qiblaBearing;
            document.getElementById('qibla-degrees').textContent = Math.round(qiblaBearing);
            document.getElementById('qibla-arrow').style.transform = `translateX(-50%) rotate(${qiblaBearing}deg)`;
        }

        // Recalibrate Qibla
        function recalibrateQibla() {
            if (userLocation) {
                calculateQiblaDirection(userLocation.lat, userLocation.lng);
                showToast(translationAPI[currentLanguage].qiblaRecalibrated, 'success');
            } else {
                showToast(translationAPI[currentLanguage].unableToRecalibrate, 'error');
            }
        }

        // Load daily Quran verse
        function loadDailyVerse() {
            // For demo, we'll use a random verse
            const randomSurah = Math.floor(Math.random() * 114) + 1;
            const randomAyah = Math.floor(Math.random() * 10) + 1;
            
            fetch(`${QURAN_API}/ayah/${randomSurah}:${randomAyah}/editions/quran-uthmani,en.sahih`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    const verse = data.data[0];
                    const translation = data.data[1];
                    
                    document.getElementById('daily-verse-arabic').textContent = verse.text;
                    document.getElementById('daily-verse-translation').textContent = translation.text;
                    document.getElementById('daily-verse-reference').textContent = 
                        `Surah ${verse.surah.englishName}, Ayah ${verse.numberInSurah}`;
                })
                .catch(error => {
                    console.error('Error loading daily verse:', error);
                    document.getElementById('daily-verse-arabic').textContent = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
                    document.getElementById('daily-verse-translation').textContent = 'In the name of Allah, the Entirely Merciful, the Especially Merciful.';
                    document.getElementById('daily-verse-reference').textContent = 'Surah Al-Fatihah, Ayah 1';
                });
        }

        // Load surah list
        function loadSurahList() {
            try {
                // Try to fetch from API first
                fetch(`${QURAN_API}/surah`)
                    .then(response => {
                        if (!response.ok) throw new Error('Failed to fetch surah list');
                        return response.json();
                    })
                    .then(data => {
                        allSurahs = data.data;
                        renderSurahList(allSurahs);
                    })
                    .catch(error => {
                        console.error('Error loading surah list from API:', error);
                        // Fallback to mock data
                        allSurahs = MOCK_QURAN_DATA.surahs;
                        renderSurahList(allSurahs);
                        showToast(translationAPI[currentLanguage].usingSamplePrayerTimes, 'error');
                    });
            } catch (error) {
                console.error('Error in loadSurahList:', error);
                allSurahs = MOCK_QURAN_DATA.surahs;
                renderSurahList(allSurahs);
            }
        }

        function renderSurahList(surahs) {
            const listContainer = document.getElementById('surah-list');
            let html = '';
            
            surahs.forEach(surah => {
                html += `
                    <div class="surah-item" onclick="loadFullSurah(${surah.number})">
                        <div>
                            <div class="surah-name">${surah.englishName}</div>
                            <div class="surah-details">${surah.englishNameTranslation} • ${surah.numberOfAyahs} verses • ${surah.revelationType}</div>
                        </div>
                        <div class="arabic-text">${surah.name}</div>
                    </div>
                `;
            });
            
            listContainer.innerHTML = html;
        }

        // Load a specific surah
        function loadSurah(surahNumber) {
            currentSurah = surahNumber;
            currentVerse = 1;
            loadVerse(surahNumber, 1);
            switchTab('quran-tab');
        }

        // Load full surah in modal
        async function loadFullSurah(surahNumber) {
            try {
                // Show loading state
                document.getElementById('surah-modal-header').innerHTML = `
                    <div class="text-center">
                        <div class="spinner-border" role="status"></div>
                        <p class="mt-2">Loading Surah...</p>
                    </div>
                `;
                document.getElementById('surah-modal-content').innerHTML = '';

                // Fetch surah data
                const response = await fetch(`${QURAN_API}/surah/${surahNumber}/editions/quran-uthmani,en.sahih`);
                if (!response.ok) throw new Error('Failed to fetch surah data');
                
                const data = await response.json();
                const surah = data.data[0];
                const translation = data.data[1];
                
                // Update modal header
                document.getElementById('surah-modal-header').innerHTML = `
                    <h3>${surah.englishName} (${surah.name})</h3>
                    <p>${surah.englishNameTranslation} • ${surah.numberOfAyahs} verses • ${surah.revelationType}</p>
                `;
                
                // Update modal content with all verses
                let versesHtml = '';
                for (let i = 0; i < surah.ayahs.length; i++) {
                    versesHtml += `
                        <div class="verse-item">
                            <div class="arabic-text">
                                <span class="verse-number">${surah.ayahs[i].numberInSurah}</span>
                                ${surah.ayahs[i].text}
                            </div>
                            <div class="translation-text">
                                ${translation.ayahs[i].text}
                            </div>
                        </div>
                    `;
                }
                
                document.getElementById('surah-modal-content').innerHTML = versesHtml;
                
                // Show the modal
                const surahModal = new bootstrap.Modal(document.getElementById('surahModal'));
                surahModal.show();
                
            } catch (error) {
                console.error('Error loading full surah:', error);
                showToast(translationAPI[currentLanguage].errorLoadingSurah, 'error');
            }
        }

        // Load a specific verse
        function loadVerse(surah, verse) {
            fetch(`${QURAN_API}/ayah/${surah}:${verse}/editions/quran-uthmani,en.sahih`)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then(data => {
                    const verseData = data.data[0];
                    const translation = data.data[1];
                    
                    document.getElementById('quran-display-arabic').textContent = verseData.text;
                    document.getElementById('quran-display-translation').textContent = translation.text;
                    document.getElementById('quran-display-reference').textContent = 
                        `Surah ${verseData.surah.englishName}, Ayah ${verseData.numberInSurah}`;
                })
                .catch(error => {
                    console.error('Error loading verse:', error);
                    showToast(translationAPI[currentLanguage].errorLoadingSurah, 'error');
                });
        }

        // Navigate to previous verse
        function previousVerse() {
            if (currentVerse > 1) {
                currentVerse--;
                loadVerse(currentSurah, currentVerse);
            } else {
                showToast(translationAPI[currentLanguage].firstVerse);
            }
        }

        // Navigate to next verse
        function nextVerse() {
            // For demo, we'll just increment (in a real app, you'd check if this is the last verse)
            currentVerse++;
            loadVerse(currentSurah, currentVerse);
        }

        // Load random verse
        function randomVerse() {
            const randomSurah = Math.floor(Math.random() * 114) + 1;
            const randomAyah = Math.floor(Math.random() * 10) + 1;
            currentSurah = randomSurah;
            currentVerse = randomAyah;
            loadVerse(randomSurah, randomAyah);
        }

        // Handle Quran search
        function handleQuranSearch(e) {
            const query = e.target.value.toLowerCase();
            const searchResults = document.getElementById('quran-search-results');
            
            if (query.length < 3) {
                searchResults.style.display = 'none';
                return;
            }
            
            // Filter surahs based on query
            const filteredSurahs = allSurahs.filter(surah => 
                surah.englishName.toLowerCase().includes(query) || 
                surah.englishNameTranslation.toLowerCase().includes(query) ||
                surah.name.includes(query)
            );
            
            if (filteredSurahs.length > 0) {
                let html = '';
                filteredSurahs.forEach(surah => {
                    html += `
                        <div class="search-result-item" onclick="loadSurah(${surah.number})">
                            <div class="surah-name">${surah.englishName}</div>
                            <div class="surah-details">${surah.englishNameTranslation}</div>
                        </div>
                    `;
                });
                searchResults.innerHTML = html;
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
                searchResults.style.display = 'block';
            }
        }

        // Play current verse audio
        function playCurrentVerse() {
            const audio = document.getElementById('quran-audio');
            const playIcon = document.getElementById('play-icon');
            const reciter = document.getElementById('reciter-select').value;
            
            // Format the verse number with leading zeros
            const verseNumber = currentVerse.toString().padStart(3, '0');
            const surahNumber = currentSurah.toString().padStart(3, '0');
            
            // Construct the audio URL
            const audioUrl = `${QURAN_AUDIO_API}/${reciter}/${surahNumber}${verseNumber}.mp3`;
            
            if (audio.paused) {
                audio.src = audioUrl;
                audio.play();
                playIcon.className = 'fas fa-pause';
            } else {
                audio.pause();
                playIcon.className = 'fas fa-play';
            }
        }

        // Handle audio ended event
        function onAudioEnded() {
            document.getElementById('play-icon').className = 'fas fa-play';
        }

        // Tasbih Counter Functions
        function incrementDhikr() {
            dhikrCount++;
            document.getElementById('dhikr-counter').textContent = dhikrCount;
            
            // Check if target reached
            if (dhikrCount >= dhikrTarget) {
                document.getElementById('dhikr-counter').style.color = '#ff6a00';
                showToast(translationAPI[currentLanguage].dhikrTargetReached, 'success');
                // Vibrate on mobile if supported
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
            }
        }

        function resetDhikr() {
            dhikrCount = 0;
            document.getElementById('dhikr-counter').textContent = dhikrCount;
            document.getElementById('dhikr-counter').style.color = '';
            
            // Update target based on selection
            const select = document.getElementById('dhikr-type');
            dhikrTarget = parseInt(select.value);
        }

        // 99 Names of Allah Functions
        function loadAllahNames() {
            // Using mock data for simplicity
            displayAllahName(0);
        }

        function displayAllahName(index) {
            const name = MOCK_ALLAH_NAMES[index];
            document.getElementById('allah-name-arabic').textContent = name.arabic;
            document.getElementById('allah-name-english').textContent = name.english;
            document.getElementById('allah-name-meaning').textContent = name.meaning;
        }

        function nextAllahName() {
            allahNamesIndex = (allahNamesIndex + 1) % MOCK_ALLAH_NAMES.length;
            displayAllahName(allahNamesIndex);
        }

        // Islamic Calendar Functions
        function loadIslamicCalendar() {
            const calendarElement = document.getElementById('islamic-calendar');
            
            // Generate a simple calendar for demo
            let html = '';
            
            // Add day headers
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            days.forEach(day => {
                html += `<div class="calendar-header">${day}</div>`;
            });
            
            // Add days
            for (let i = 1; i <= 30; i++) {
                const isToday = i === new Date().getDate();
                const isHijri = i % 5 === 0; // Just for demo
                
                let dayClass = 'calendar-day';
                if (isToday) dayClass += ' active';
                if (isHijri) dayClass += ' hijri';
                
                html += `<div class="${dayClass}">${i}</div>`;
            }
            
            calendarElement.innerHTML = html;
            
            // Update month display
            const months = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 
                           'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban', 
                           'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'];
            const currentMonth = months[new Date().getMonth()];
            document.getElementById('hijri-month').textContent = `${currentMonth} 1445 AH`;
        }

        // Hadith Functions
        // Load hadith books for the selected collection
        async function loadHadithBooks() {
            try {
                const response = await fetch(`${HADITH_API_URL}?apiKey=${HADITH_API_KEY}&collection=${currentHadithCollection}`);
                
                if (!response.ok) throw new Error('Failed to fetch hadith books');
                const data = await response.json();
                
                // Display books
                displayHadithBooks(data.hadiths.data);
                
            } catch (error) {
                console.error('Error fetching hadith books:', error);
                document.getElementById('hadith-books-list').innerHTML = `
                    <div class="text-center">
                        <p>${translationAPI[currentLanguage].noHadithsFound}</p>
                        <button class="btn btn-primary" onclick="loadHadithBooks()">Retry</button>
                    </div>
                `;
            }
        }

        // Display hadith books
        function displayHadithBooks(hadiths) {
            let html = `<h6 class="mb-3">Hadiths from ${currentHadithCollection}</h6>`;
            
            if (hadiths && hadiths.length > 0) {
                // Display first 10 hadiths
                hadiths.slice(0, 10).forEach(hadith => {
                    html += `
                        <div class="hadith-item">
                            <div class="hadith-arabic">${hadith.arabic || 'Arabic text not available'}</div>
                            <p>${hadith.english}</p>
                            <div class="hadith-reference">
                                ${currentHadithCollection}, Book: ${hadith.bookNumber}, Hadith: ${hadith.id}
                            </div>
                        </div>
                    `;
                });
            } else {
                html += `<p class="text-center">${translationAPI[currentLanguage].noHadithsFound}</p>`;
            }
            
            document.getElementById('hadith-results').innerHTML = html;
            document.getElementById('hadith-books-list').innerHTML = '';
        }

        // Search hadiths
        async function searchHadiths() {
            const query = document.getElementById('hadith-search').value.trim();
            if (query.length < 3) {
                showToast(translationAPI[currentLanguage].pleaseEnterChars);
                return;
            }
            
            showToast(translationAPI[currentLanguage].searchingHadiths);
            
            try {
                const response = await fetch(`${HADITH_API_URL}?apiKey=${HADITH_API_KEY}&collection=${currentHadithCollection}&search=${encodeURIComponent(query)}`);
                
                if (!response.ok) throw new Error('Failed to search hadiths');
                const data = await response.json();
                
                let html = `<h6 class="mb-3">Search results for "${query}"</h6>`;
                
                if (data.hadiths && data.hadiths.data.length > 0) {
                    data.hadiths.data.forEach(hadith => {
                        html += `
                            <div class="hadith-item">
                                <div class="hadith-arabic">${hadith.arabic || 'Arabic text not available'}</div>
                                <p>${hadith.english}</p>
                                <div class="hadith-reference">
                                    ${currentHadithCollection}, Book: ${hadith.bookNumber}, Hadith: ${hadith.id}
                                </div>
                            </div>
                        `;
                    });
                } else {
                    html += `<p class="text-center">${translationAPI[currentLanguage].noHadithsMatching}</p>`;
                }
                
                document.getElementById('hadith-results').innerHTML = html;
                document.getElementById('hadith-books-list').innerHTML = '';
                
            } catch (error) {
                console.error('Error searching hadiths:', error);
                showToast(translationAPI[currentLanguage].errorLoadingHadith, 'error');
            }
        }

        // Check for saved language on page load
        document.addEventListener('DOMContentLoaded', function() {
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage) {
                currentLanguage = savedLanguage;
                document.getElementById('language-screen').style.display = 'none';
                document.getElementById('welcome-screen').style.display = 'flex';
                document.getElementById('language-switcher').style.display = 'block';
                applyTranslations(currentLanguage);
            }
            
            initializeApp();
            setupNavigation();
            setupHadithCollectionSelector();
            setupIslamicScholarAI();
        });

        // Pre-loaded Islamic knowledge base for offline mode
        const islamicKnowledgeBase = {
            quran: {
                "what is quran": {
                    response: `The Quran is the holy book of Islam, revealed by Allah to Prophet Muhammad (PBUH) through the angel Jibril (Gabriel) over 23 years.

<b>Key Facts about the Quran:</b>
• Revealed in Arabic language
• Consists of 114 chapters (Surahs)
• Contains 6,236 verses (Ayahs)
• Preserved in its original form
• Final revelation to mankind

<div class="arabic-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
<div class="arabic-translation">"In the name of Allah, the Entirely Merciful, the Especially Merciful." (Quran 1:1)</div>

The Quran serves as guidance for all aspects of life and contains teachings about belief, worship, morality, and law.`,
                    references: ["Quran 2:2", "Quran 17:9"]
                },
                "first revelation": {
                    response: `The first revelation came to Prophet Muhammad (PBUH) in the Cave of Hira during the month of Ramadan in 610 CE.

<div class="arabic-text">اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</div>
<div class="arabic-translation">"Read in the name of your Lord who created" (Quran 96:1)</div>

The first five verses revealed were:
<div class="arabic-text">
اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
خَلَقَ الْإِنْسَانَ مِنْ عَلَقٍ
اقْرَأْ وَرَبُّكَ الْأَكْرَمُ
الَّذِي عَلَّمَ بِالْقَلَمِ
عَلَّمَ الْإِنْسَانَ مَا لَمْ يَعْلَمْ
</div>

This marked the beginning of prophethood and the revelation of the Quran.`,
                    references: ["Quran 96:1-5", "Sahih Bukhari 3"]
                }
            },
            prayer: {
                "how to pray": {
                    response: `Islamic prayer (Salah) has specific steps:

<b>1. Purification (Wudu)</b>
- Wash hands, mouth, nose, face, arms, head, ears, and feet

<b>2. Facing Qibla</b>
- Face towards Kaaba in Mecca

<b>3. Five Daily Prayers:</b>
• Fajr (Dawn) - 2 rak'ahs
• Dhuhr (Noon) - 4 rak'ahs
• Asr (Afternoon) - 4 rak'ahs
• Maghrib (Sunset) - 3 rak'ahs
• Isha (Night) - 4 rak'ahs

<b>4. Steps of Each Rak'ah:</b>
1. Takbir (Allahu Akbar)
2. Standing (Qiyam) - Recite Fatiha + Surah
3. Bowing (Ruku)
4. Standing (Qawmah)
5. Prostration (Sujood) x2
6. Sitting (Jalsah)

<div class="arabic-text">وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ</div>
<div class="arabic-translation">"And establish prayer and give zakah and bow with those who bow [in worship and obedience]." (Quran 2:43)</div>`,
                    references: ["Quran 2:43", "Sahih Muslim 397"]
                }
            },
            pillars: {
                "five pillars of islam": {
                    response: `The Five Pillars of Islam are the foundation of Muslim life:

<b>1. Shahada (Declaration of Faith)</b>
<div class="arabic-text">أشهد أن لا إله إلا الله وأشهد أن محمدًا رسول الله</div>
"I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah."

<b>2. Salah (Prayer)</b>
- Five daily prayers facing Mecca

<b>3. Zakat (Charity)</b>
- Giving 2.5% of savings to the poor annually

<b>4. Sawm (Fasting)</b>
- Fasting during Ramadan from dawn to sunset

<b>5. Hajj (Pilgrimage)</b>
- Pilgrimage to Mecca once in lifetime for those able

These pillars form the framework of Muslim worship and practice.`,
                    references: ["Sahih Bukhari 8", "Sahih Muslim 16"]
                }
            },
            prophets: {
                "prophets in islam": {
                    response: `Islam recognizes many prophets sent by Allah to guide humanity. The Quran mentions 25 prophets by name.

<b>Major Prophets:</b>
• Adam (AS) - First prophet and human
• Nuh (AS) - Noah, built the ark
• Ibrahim (AS) - Abraham, builder of Kaaba
• Musa (AS) - Moses, receiver of Torah
• Isa (AS) - Jesus, miracle-born prophet
• Muhammad (PBUH) - Final prophet, receiver of Quran

<div class="arabic-text">وَرُسُلًا قَدْ قَصَصْنَاهُمْ عَلَيْكَ مِن قَبْلُ وَرُسُلًا لَّمْ نَقْصُصْهُمْ عَلَيْكَ</div>
<div class="arabic-translation">"And [We sent] messengers about whom We have related [their stories] to you before and messengers about whom We have not related to you." (Quran 4:164)</div>

Muslims believe in all prophets without distinction.`,
                    references: ["Quran 4:164", "Quran 42:13"]
                }
            },
            general: {
                "assalamu alaikum": {
                    response: `Wa Alaikum Assalam wa Rahmatullahi wa Barakatuh!

<div class="arabic-text">وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ</div>
"And upon you be peace, and the mercy of Allah, and His blessings."

How can I assist you with Islamic knowledge today?`,
                    references: ["Quran 6:54", "Sahih Muslim 2162"]
                },
                "who is allah": {
                    response: `Allah is the Arabic name for the One True God, the Creator and Sustainer of the universe.

<b>Attributes of Allah:</b>
• The Merciful (Ar-Rahman)
• The Compassionate (Ar-Raheem)
• The Eternal (As-Samad)
• The All-Knowing (Al-Alim)
• The All-Powerful (Al-Qadir)

<div class="arabic-text">قُلْ هُوَ اللَّهُ أَحَدٌ اللَّهُ الصَّمَدُ لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ</div>
<div class="arabic-translation">"Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'" (Quran 112:1-4)</div>

Allah has 99 beautiful names that describe His perfect attributes.`,
                    references: ["Quran 112:1-4", "Quran 59:22-24"]
                }
            }
        };
    </script>
