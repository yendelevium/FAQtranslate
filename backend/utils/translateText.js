import axios from 'axios';
// Was getting credential problems with the google cloud translate library
// So I decided to directly hit the API endpoint, and it worked

// Default translation language is English
export default async function translateText(text,lang="en"){
    const translation = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${process.env.API_KEY}`,
        {
            q: text,
            target: lang
        }
    );
    return translation.data.data.translations[0].translatedText
}