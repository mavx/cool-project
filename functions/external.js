// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
// const admin = require('firebase-admin');
// const request = require('request-promise');
const request = require('request')

// Translation Section
// List of output languages.
const LANGUAGES = ['en', 'es', 'de', 'fr', 'sv', 'ga', 'it', 'jp'];

// URL to the Google Translate API.
function get(source, target, payload) {
  const url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyAZySOKJ-gH5wMhSyNaSVcDf5HgxTOco8w&source=${source}&target=${target}&q=${payload}`;
  request(url, function(err, response) {
    console.log('response', response)

    
  })
  // console.log(data)

  
  // return data.translations[0].translatedText;
}

get('en', 'fr', 'Hello world')
// function get(source, target, payload) {
//   const url = createTranslateUrl(source, target, payload)
//   return request(url, {resolveWithFullResponse: true}).then(
//     response => {
//       if (response.statusCode === 200) {
//         const data = JSON.parse(response.body).data;
//         return data.translations[0].translatedText
//         // return admin.database().ref(`/messages/${target}/${key}`)
//         // return admin.database().ref(`/messages/&{target}/`)
//         //     .set({message: data.translations[0].translatedText, translated: true});
//       }
//       throw response.body;
//     });
// }

// function createTranslationPromise(source, target, snapshot) {
//   const key = snapshot.key;
//   const message = snapshot.val().message;
//   return request(createTranslateUrl(source, target, message), {resolveWithFullResponse: true}).then(
//       response => {
//         if (response.statusCode === 200) {
//           const data = JSON.parse(response.body).data;
//           return admin.database().ref(`/messages/${target}/${key}`)
//               .set({message: data.translations[0].translatedText, translated: true});
//         }
//         throw response.body;
//       });
// }
