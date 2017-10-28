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
            createdAt: q.createdAt,
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
