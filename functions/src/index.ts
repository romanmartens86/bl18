import * as functions from 'firebase-functions';

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloFromRoman = functions.https.onRequest((request, response) => {
 response.send("Hello from Roman!");
});



export const createUserData = functions.auth.user().onCreate((user) =>
{ 	//get firebase user
	
	
	//  user data administrative list -> for data that should not be seen by everyone
	admin.database().ref('/u_admin/' + user.uid)
		.set({ UID: user.uid,
				email: user.email,
				level: 10
				});
	
	//  user data internal list -> for data that should be open for church members
	admin.database().ref('/u_intern/' + user.uid)
    .set({
		UID: user.uid,
		name: user.displayName,
      	photoURL: user.photoURL});
  });

  // on deletion of user -> all saved data has to be removed
  // because of European DataProtection Laws
  export const deleteUserData = functions.auth.user().onDelete((user) =>
  { // get firebase user


	// user data administrative list -> for data that should not be seen by everyone
	admin.database().ref('/u_admin/' + user.uid)
		.remove();

	// user data internal list -> for data that should be open for church members
	admin.database().ref('/u_intern/' + user.uid)
		.remove();
	

  });