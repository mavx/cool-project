// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

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

exports.addMessage = functions.https.onRequest((req, res) => {
    // [END addMessageTrigger]
      // Grab the text parameter.
      const original = req.query.text;
      // [START adminSdkAdd]
      // Push the new message into the Realtime Database using the Firebase Admin SDK.
      admin.firestore().collection('messages').add({original: original}).then(writeResult => {
        // Send back a message that we've succesfully written the message
        res.json({result: `Message with ID: ${writeResult.id} added.`});
      });
      // [END adminSdkAdd]
    });

exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate(event => {
// [END makeUppercaseTrigger]
      // [START makeUppercaseBody]

      // Grab the current value of what was written to the Realtime Database.
      const original = event.data.data().original;
      console.log('Uppercasing', event.params.documentId, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an 'uppercase' sibling in the Realtime Database returns a Promise.
      return event.data.ref.set({uppercase}, {merge: true});
      // [END makeUppercaseBody]
    });
