import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as  serviceAccountKey from '../serviceAccountKey.json';

admin.initializeApp({
    credential: admin.credential.cert(<any>serviceAccountKey),
    databaseURL: "https://functiondemo-626c1.firebaseio.com"
});


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const getWeather = functions.https.onRequest((req,res)=>{
    admin.firestore().doc('cities-weather/autin-tx-us').get()
    .then(result=>{
        const data= result.data();
        if(!data){
            res.send('No data found');
        }
        res.status(200).json({success: true,"data":data});
    })
    .catch(e=>{
        res.status(500).send(e);
    }) 

})