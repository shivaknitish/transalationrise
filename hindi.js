// Detect the user's preferred language
        const userLang = navigator.language || navigator.userLanguage;

        // Function to translate text using Google Translate API
        async function translateText(text, targetLang) {
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
            const result = await response.json();
            return result[0][0][0];
        }

        // Function to update the content based on the detected language
        async function updateContent() {
            const targetLang = userLang.split('-')[0]; // Get the base language code, e.g., 'en' from 'en-US'

            const greetingElement = document.getElementById('greeting');
            const contentElement = document.getElementById('content');

            greetingElement.innerText = await translateText(greetingElement.innerText, targetLang);
            contentElement.innerText = await translateText(contentElement.innerText, targetLang);
        }

        // Call the function to update the content
        updateContent();
