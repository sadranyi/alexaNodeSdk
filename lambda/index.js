var Alexa = require('alexa-sdk'),
moment = require('moment'),
mtz = require('moment-timezone'),
http = require('http');

var speechOut;
var repromptSpeech;
var cardTitle = "Hello Ghana Flash Cards";
var cardContent = "Learn about Ghana using Alexa flash card";

var config = {
    APP_ID : "amzn1.ask.skill.ae4eb4ed-6c4e-475d-ac16-d4a0865a28ce",
}

// Application Custom States
var states = {
    STARTMODE: '_STARTMODE', // Prompt the user to start or restart learning
    HELPMODE: '_HELPMODE'   // User requests Help
};

var url = function(searchFilter){
    return "http://apiurl";
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = config.APP_ID;
    alexa.registerHandlers(newSessionHandlers, handlers, helperHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    // NewSession is a Catch all behaviour and entry point.
    'NewSession': function(){
        if(Object.keys(this.attributes).length === 0){
            this.attributes['lessonsGiven'] = 0;
        }

        var count = this.attributes['lessonsGiven'].toString();
        speechOut = 'Welcome, I am very glad to teach you more about Ghana. I have taught ' + count + 'people about Ghana. Would you want to know more about Ghana?';
        repromptSpeech = "Say yes, or, teach me to start a new game, or say stop to quit";

        this.handler.state = states.STARTMODE;
        this.emit(':ask', speechOut, repromptSpeech);
    }
};

var handlers = {

    'LaunchRequest' : function(){
        this.emit('SayHello');
    },

    'WelcomeIntent' : function (params) {
        this.emit('SayHello');
    },

    'SessionEndedRequest' : function (params) {
        speechOut = 'Ok, see you next time!';
        this.emit(':tell', speechOut);
    },

    'AMAZON.HelpIntent' : function(){
        speechOut = 'I will be teaching you about Ghana, if you want to know more, say yes, or say, teach me.';
        repromptSpeech = 'Do you want to Know more?';
        this.emit(':tell', speechOut, speechOut);
    },

    'TeachMeIntent': function(){
        speechOut = "This is where i start telling you about Ghana";
        this.emit(':tell', speechOut);
    },

    'AMAZON.YesIntent' : function(){
        this.emit('TeachMeIntent');
    },

    'unhandled' : function(){
        speechOut = 'Sorry, I didn\'t get that. Try saying teach me';
        repromptSpeech = 'Try saying teach me';
        this.emit(':ask', speechOut, repromptSpeech);
    },

    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};

// All Helper Functions
var helperHandlers = {
    'SayHello' : function(){
        speachOut = "Welcome, I am Alexa, and I will be teaching you about Ghana. Lets play. To begin say, teach me, or say, Stop to exit.";
        repromptSpeech = "Do you want to Know more about Ghana?";
        
        this.emit(':tell', speachOut);
    },

    'GetHistory' : function(filter){
        http.get(url(filter), function(response){
            var body = '';
            response.on('data', function(data){
                body += data;
            });

            response.on('end', function(){
                this.emit(body);
            })
        }).on('error', function(e){
            console.log('error: ' + e);
        })
    },

    'GetCityHistory' : function(){

    }
};