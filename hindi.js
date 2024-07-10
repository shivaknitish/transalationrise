<script>
        // Detect the user's preferred language
        const userLang = navigator.language || navigator.userLanguage;

        // Function to translate text using Google Translate API
        async function translateText(text, targetLang) {
            const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
            const result = await response.json();
            return result[0][0][0];
        }

        // Function to translate all text nodes in the body
        async function translateBodyContent(targetLang) {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            const textNodes = [];

            let node;
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }

            for (const textNode of textNodes) {
                const translatedText = await translateText(textNode.nodeValue, targetLang);
                textNode.nodeValue = translatedText;
            }
        }

        // Function to update the content based on the detected language
        async function updateContent() {
            const targetLang = userLang.split('-')[0]; // Get the base language code, e.g., 'en' from 'en-US'
            await translateBodyContent(targetLang);
        }

        // Call the function to update the content when the page loads
        document.addEventListener('DOMContentLoaded', updateContent);
    </script>
