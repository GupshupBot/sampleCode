/** This is a sample code for your bot**/
function MessageHandler(context, event) {
    
//add an audio object 
    if(event.message=='audio'){
       var audioObj = {
              "type":"audio",   
              "url":"<URL HERE>"
                };
      context.sendResponse(JSON.stringify(audioObj));
    }
    
    //add an image 
    else if (event.message == "image") {
        var imageObj = {
              "type":"image",   
              "originalUrl":"<URL HERE>",
              "previewUrl":"<URL HERE>"
                };
      context.sendResponse(JSON.stringify(imageObj));
    }
    

  //add a video object 
    else  if(event.message=='video'){
    var videoObj = {
     "type":"video",    
     "url":"<URL HERE>"
      };
      context.sendResponse(JSON.stringify(videoObj));
    }
    
    //add a file
    else  if(event.message=='file'){
    var fileObj = {
     "type":"file", 
     "url":"<URL HERE>"
      };
      context.sendResponse(JSON.stringify(fileObj));
    }
    
    // Take a poll
    else if (event.message == 'poll') {
         var payload = {
            "type": "poll",
            "question": "Do you like ice-cream?",
            "msgid": "poll_2112" //Set the msgID so that you can identify it in case of multiple polls
              };
    context.sendResponse(JSON.stringify(payload));
    }
    
    // Response to the poll
    else if (event.messageobj.refmsgid == 'poll_2112') { 
      if (event.message.toLowerCase() == 'yes') {
        context.sendResponse('Thanks for participating in our poll. We like ice-cream too!');   
      }
      else if (event.message.toLowerCase() == 'no') {
        context.sendResponse('You are the first person to say that :(');    
      }
    }
    
    // Take a survey. Similar to a poll but with more than 2 options
    else if (event.message == 'survey') {
        var button = {
              "type": "survey",
              "question": "Whats your favourite ice-cream flavour?",
              "options": ["Vanilla", "Chocolate", "Butterscotch"],
              "msgid": "survey_42"
             }   
        context.sendResponse(JSON.stringify(button));
    }
    
  else if (event.messageobj.refmsgid == 'survey_42') {
    context.sendResponse('Aww yiss! ' + event.message + ' is our favourite flavour too!');
  }

  // Show a catalogue (similar to Facebook Messenger's carousel)
    else if (event.message == 'catalogue') {
        var catalogue_button = {
            "type": "catalogue",
  "msgid": "cat_007",
  "items": [{
    "title": "Choco chip ice-cream",
    "subtitle": "Small $3 \n Large $5",
    "imgurl": "<IMAGE URL HERE>",
    "options": [
        {
        "type": "url",
        "title": "View Details",
        "url": "<URL HERE>"
      }, 
            {
        "type": "text",
        "title": "Buy"
      }
    ]
  }, 
     {
    "title": "Strawberry ice-cream",
    "subtitle": "Small $3 \n Large $5",
    "imgurl": "<IMAGE URL HERE>",
    "options": [
        {
      "type": "url",
      "title": "View Details",
      "url": "<URL HERE>"
    }, 
        {
      "type": "text",
      "title": "Buy"
    }]
  }]
        }
        context.sendResponse(JSON.stringify(catalogue_button));
    }

   else if (event.messageobj.refmsgid == 'cat_007') {
      if (event.message.toLowerCase() == 'buy 1') { // 1 is appended to the title of the first item in the catalogue, 2 to the second and so on
        context.sendResponse('There is some choco chip ice-cream coming your way!');
      }
      else if (event.message.toLowerCase() == 'buy 2') {
        context.sendResponse('There is some strawberry ice-cream coming your way!');
      }
    }
    
    // Show quick reply buttons
    else if (event.message == 'quick reply') {
        var quickreply = {
    "type": "quick_reply",
    "content": {
        "type": "text",
        "text": "What's your favourite color?"
    },
    "msgid": "qr_714",
    "options": [
        "Red",
        "Green",
        "Yellow",
        "Blue"
    ]
}
context.sendResponse(JSON.stringify(quickreply));   
    }

    else if (event.messageobj.refmsgid == 'qr_714') {
      context.sendResponse(event.message + ' is the best!');
    }
    

    // Dial a number. This only works on mobile
    else if (event.message == 'call') {
        var phoneNumber = {
             "type": "survey",
    "question": "What would you like to do?",
    "msgid": "3er45",
    "options": [{
        "type": "phone_number",
        "title": "Call us",
        "phone_number": "<Phone Number here>"
    }]
        }
        context.sendResponse(JSON.stringify(phoneNumber));
    }
    
    // Hide the web widget
    else if (event.message == 'hide') {
        var toHide = {
            "type":"survey",
            "question":"Do You Want to Connect?",
            "msgid":"cry56-Wid-90",
            "options":["Connect"]
        }
        context.sendResponse(JSON.stringify(toHide));
    }
    
    // Embed a video response
     else if (event.message == "video response") {
        var vid = {
            "type":"intro_vid",
            "url":"<URL HERE>"
        }
        context.sendResponse(JSON.stringify(vid));
    } 
    
}
/** Functions declared below are required **/
function EventHandler(context, event) {
    if(! context.simpledb.botleveldata.numinstance)
        context.simpledb.botleveldata.numinstance = 0;
    numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
    context.simpledb.botleveldata.numinstance = numinstances;
   // context.sendResponse("Thanks for adding me. You are:" + numinstances);
}

function HttpResponseHandler(context, event) {
    context.sendResponse(event.getresp);
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}