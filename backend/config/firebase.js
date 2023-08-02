const admin = require("firebase-admin");
const fileAu = require("./firebaseAuth.json");
require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(fileAu),
  storageBucket: process.env.FIREBASE_STOREAGE_BUCKET,
});

const bucket = admin.storage().bucket();

// bucket.upload('./config/upload.png', {
//   destination: 'videos/upload.png'
// })

module.exports = {
  bucket,
};
