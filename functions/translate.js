const functions = require('firebase-functions');
const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
const request = require('request-promise');

exports.translate = function(text) {
    // List of output languages.
    const LANGUAGES = ['es', 'de', 'fr', 'sv', 'ga', 'it', 'jp'];
    const promises = [];
    for (let i = 0; i < LANGUAGES.length; i++) {
        var language = LANGUAGES[i];
    if (language != null) {
        promises.push(createTranslationPromise('en', language, text)); // Defaults to english input
    }
  }
  return Promise.all(promises);
};

// URL to the Google Translate API.
function createTranslateUrl(source, target, payload) {
  const key = 'AIzaSyAZySOKJ-gH5wMhSyNaSVcDf5HgxTOco8w'
  return `https://www.googleapis.com/language/translate/v2?key=${key}&source=${source}&target=${target}&q=${payload}`;
}

function createTranslationPromise(source, target, text) {
  return request(createTranslateUrl(source, target, text), {resolveWithFullResponse: true}).then(
      response => {
        if (response.statusCode === 200) {
          const data = JSON.parse(response.body).data;
          return data.translations[0].translatedText
        }
        throw response.body;
      });
}
