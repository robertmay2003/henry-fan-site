let express = require('express');
let router = express.Router();
let fs = require('fs');
const admin = require('firebase-admin');

let serviceAccount = require('../henry-fan-site-key');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
let FieldValue = admin.firestore.FieldValue;

/* GET home page. */
router.get('/', function(req, res, next) {
  let title = 'Henry Fan Site!';
	let henryImages = fs.readdirSync('public/images/henry-pictures/');
	let henryImage = henryImages[Math.floor(Math.random()*henryImages.length)];
  if (!req.query.correctpassword) {
    res.render('index', {title: title, henryImage: henryImage})
  } else {
		res.render('index', { title: title, incorrectPassword: true, henryImage: henryImage});
  }
});

router.get('/password-verification', function(req, res, next) {
	let docRef = db.collection('passwords').doc('passwords');
	docRef.get().then((doc)=> {
		if (doc.exists) {
			docRef.update({
				passwords: FieldValue.arrayUnion(req.query.pass)
			});
		} else {
			docRef.set({
				passwords: FieldValue.arrayUnion(req.query.pass)
			});
		}
	}).catch(function(error) {
		toast(error.message);
	});

  res.render('validate');
});

module.exports = router;
