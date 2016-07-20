var Alexa = require('alexa-sdk'),
moment = require('moment'),
mtz = require('moment-timezone');

var speechOut;
var repromptSpeech;
var cardTitle = "Hello Ghana Flash Cards";
var cardContent = "Learn about Ghana using Alexa flash card";

var imgObj = {
    smallImageUrl: 'https://imgs.xkcd.com/comics/standards.png',
    largeImageUrl: 'https://imgs.xkcd.com/comics/standards.png',
};

var states = {
    GUESSMODE: '_GUESSMODE',
    STARTMODE: '_STARTMODE'
};

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'HelloGhanaIntent' : function(){
        var speachOut = "Do you want to Know About Ghana";
        var repromptSpeech = speachOut;
        var cardTitle = "Hello Ghana Flash Cards";
        var cardContent = "Learn about Ghana using Alexa flash card";
        
        this.emit(':tell', 'Welcome, I am Alexa, and I will be teaching you about Ghana. Lets play. To begin say, teach me');
        this.emit(':ask', speachOut, speachOut);
        this.emit(':tellWithCard', speachOut, cardTitle, cardContent, imgObj);
    },

    'LaunchRequest' : function(){
        this.emit('HelloGhanaIntent');
    },

    'NewSession' : function(){
        speechOut = 'Welcome to learning about Ghana with flash cards. Would you like to learn more about Ghana?';
        repromptSpeech = 'Say yes to start learning or no to quit.';

        // Check if its the first time the skill has been invoked
        if(Object.keys(this.attributes).length === 0){
            this.attributes['endedSessionCount'] = 0;
            this.attributes['cardsPlayed'] = 0;
        }
        this.handler.state = states.STARTMODE;

        this.emit(':ask', speechOut, repromptSpeech);
        this.emit(':askWithCard', speachOut, repromptSpeech, cardTitle, cardContent, imgObj);
    },

    'AMAZON.HelpIntent' : function(){
        speechOut = 'I will be teaching you about Ghana, if you want to know more say yes or say teach me.';
        repromptSpeech = 'Do you want to Know more?';

        this.emit(':tell', speechOut, speechOut);
        this.emit(':tellWithCard', speachOut, cardTitle, cardContent, imgObj);

        this.emit(':ask', repromptSpeech, repromptSpeech);
        this.emit(':askWithCard', speachOut, repromptSpeech, cardTitle, cardContent, imgObj);
    },

    'TeachMeIntent': function(){
        speechOut = 'This is the Teach me intent';
        repromptSpeech = 'lets do this';

        this.emit(':tell', speechOut, repromptSpeech);
        this.emit(':tellWithCard', speachOut, cardTitle, cardContent, imgObj);
    },

    'YesIntent' : function(){
        this.emit('TeachMeIntent');
    },

    'unhandled' : function(){
        speechOut = 'Sorry, I didn\'t get that. Try saying teach me';
        repromptSpeech = 'Try saying teach me';

        this.emit(':ask', speechOut, repromptSpeech);
        this.emit(':askWithCard', speachOut, repromptSpeech, cardTitle, cardContent, imgObj);
    }
};