const admin = require('firebase-admin')
const fileAu = require('./firebaseAuth.json')

admin.initializeApp({
  credential: admin.credential.cert(fileAu),
  storageBucket: "gs://videosstorage.appspot.com"
});

const bucket = admin.storage().bucket()

// bucket.upload('./config/upload.png', {
//   destination: 'videos/upload.png'
// })

module.exports = {
  bucket
}