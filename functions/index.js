'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const language = require('@google-cloud/language');

const indico = require('indico.io');
indico.apiKey =  '####';

// for DB
var admin = require("firebase-admin");
var serviceAccount = require("./config/moodusc-5dd4b-firebase-adminsdk-mxz16-6f8c1770f5.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://moodusc-5dd4b.firebaseio.com"
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

var GlobalMood = "-";

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

 
  function welcome(agent) {
    agent.add(`Welcome to your mood diary. I am your emotion assistant. Do you want to add new mood record or view previous record?`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

function addrecord(agent) {
      //pass
    // agent.add(request.body.result.resolvedQuery);
     agent.add(`Alright. Please tell me about your day or how do you feel now.`);
}

function savestory(agent) {
    //agent.add(request.body.inputs[0].rawInputs.query);
    let text = request.body.result.resolvedQuery;
    responseAccordingToMood(text)/*.then(function(){
        console.log("save story,, ", GlobalMood);
        agent.add(`alright`);
        if (GlobalMood == "anger"){
            agent.add("Your anger");
        }
    });*/
    //agent.add(GlobalMood);
    agent.add(`Got it. Anything else happened today? Do you want to continue?`);
}

function savefinalstory(agent) {
    //agent.add(request.body.inputs[0].rawInputs.query);
    let text = request.body.result.resolvedQuery;
    responseAccordingToMood(text);
    agent.add(`I wish I could have a body to be with you. Invoke me anytime you want to share your mood. See you.`);
}

 function sentResponse(){
     // let responseJson = {};
     // responseJson.speech = GlobalMood; // spoken response
     // responseJson.displayText = GlobalMood; // displayed response
     // response.json(responseJson); // Send response to Dialogflow
   // agent.add(`happy`);
 }

 function responseAccordingToMood(text){
     var Mood = "#";
     var timestamp = Date.now();

     var respon = function(res) {
         console.log("res Type:", typeof res);
         console.log("API call result:", res);
         var Mood_value = 0;

         if ( res.anger > Mood_value){ Mood = "anger"; Mood_value = res.anger;}
         if ( res.joy > Mood_value){ Mood = "happy"; Mood_value = res.joy; }
         if ( res.fear > Mood_value){ Mood = "fear"; Mood_value = res.fear; }
         if ( res.sadness > Mood_value){ Mood = "sadness"; Mood_value = res.sadness; }
         if ( res.surprise > Mood_value){ Mood = "surprise"; }

         GlobalMood = Mood;
         console.log("The most mood is: ", GlobalMood);

         let currentMood = admin.database().ref().child('/moods/' + timestamp);
         currentMood.once('value', function(snapshot) {
             if (snapshot.exists() && snapshot.hasChild('mood')) {
                 currentMood.update({
                     mood : [res.anger, res.joy, res.fear, res.sadness, res.surprise]
                 });
             } else {
                 currentMood.set({
                     mood: [res.anger, res.joy, res.fear, res.sadness, res.surprise],
                     date: timestamp,
                     raw: text,
                 });
             }
         });
     };

     var respon1 = function(res) {
         console.log("res Type:", typeof res);
         console.log("Keywords call result:", res);

         let currentMood = admin.database().ref().child('/tags/' + timestamp);
         currentMood.once('value', function(snapshot) {
             if (snapshot.exists() && snapshot.hasChild('tags')) {
                 currentMood.update({
                     tags : res
                 });
             } else {
                 currentMood.set({
                     tags : res,
                     date: timestamp,
                     raw: text,
                 });
             }
         });
     }

     var logError = function(err) {
         console.log("There is an error!!!", err);
     };

     indico.keywords(text, {version: 2})
         .then(respon1)
         .catch(logError);

     return indico.emotion(text)
         .then(respon)
         .catch(logError);
 }

 function retrieve(agent){
     let date = app.getArgument('date');
     console.log("date!", typeof date, date);
 }


let intentMap = new Map();
intentMap.set('Default Welcome Intent', welcome);
intentMap.set('Default Fallback Intent', fallback);
intentMap.set('Add Record', addrecord);
intentMap.set('Add Record - custom', savestory);
intentMap.set('Add Record - fallback', savefinalstory);
intentMap.set('Retrieve Record', retrieve);
intentMap.set('Add Record - custom - fallback', savefinalstory);
agent.handleRequest(intentMap);
});
