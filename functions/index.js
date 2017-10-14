// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({origin: true});

// Async
// const request = require('request-promise');
const request = require('request')

// Import local libraries
const external = require('./external.js')

const LANGUAGES = ['en', 'es', 'de', 'fr', 'sv', 'ga', 'it', 'jp'];
// // Take the text parameter passed to this HTTP endpoint and insert it into the
// // Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest((req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     admin.database().ref('/messages').push({original: original}).then(snapshot => {
//       // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//       res.redirect(303, snapshot.ref);
//     });
//   });
function get(source, target, payload) {
  const url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyAZySOKJ-gH5wMhSyNaSVcDf5HgxTOco8w&source=${source}&target=${target}&q=${payload}`;
  request(url, function(err, response) {
    console.log('response', response)

    
  })
  // console.log(data)

  
  // return data.translations[0].translatedText;
}


exports.addTask = functions.https.onRequest((req, res) => {

  cors(req, res, () => {
    // [END addMessageTrigger]
      // Grab the text parameter.
      // const original = req.query.text;
      const q = req.query;
      // [START adminSdkAdd]
      // Push the new message into the Realtime Database using the Firebase Admin SDK.

      const url = `https://www.googleapis.com/language/translate/v2?key=AIzaSyAZySOKJ-gH5wMhSyNaSVcDf5HgxTOco8w&source=en&target=fr&q=${q.task}`;
      request(url, function(err, response) {
        // console.log('response', response)
          const translated = JSON.parse(response.body).data.translations[0].translatedText
          const newTask = {
            assignedUser: q.assignedUser,
            task: q.task,
            createdBy: q.createdBy,
            status: q.status,
            // translated: JSON.parse(response.body).data.translations[0].translatedText
            translated: translated
          };
    
          admin.firestore().collection('tasks').add(newTask).then(writeResult => {
            res.json({result: `Message with ID: ${writeResult.id} added.`});
          })
      })
  })

})

// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
exports.translate = functions.firestore.document('/tasks/{documentId}')
    .onCreate(event => {
// [END makeUppercaseTrigger]
      // [START makeUppercaseBody]

      // Grab the current value of what was written to the Realtime Database.
      const document = event.data.data() //ACCESS SOME RANDOM DOCUMENT ID HERE
      const task = document.task
      // console.log('Uppercasing', event.params.documentId, original);
      // const uppercase = original.toUpperCase();
      // const translated = external.get('en', 'fr', task)
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an 'uppercase' sibling in the Realtime Database returns a Promise.
      // return event.data.ref.set({uppercase}, {merge: true});
      // return event.data.ref.set({translated}, {merge: true});

      // FIRESTORE SHIT
      // event.data.ref.set(newDocument)
      // event.data.ref.set({translated: 'batshit'}, {merge: true});
      var object = db.collection('tasks').doc(event.params.documentId);

      object.update({
        translated: 'batshit'
      })
      // .then(function() {
      //   console.log("Document successfully updated!");
      // })
      // .catch(function(error) {
      //   // The document probably doesn't exist.
      //   console.error("Error updating document: ", error);
      // });


      // [END makeUppercaseBody]
    });
