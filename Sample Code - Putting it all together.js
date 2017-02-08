/** This is a sample code for your bot**/
function MessageHandler(context, event) {
            if(event.message.toLowerCase() == "hi") {
                context.sendResponse("hello");
            }
            else if(event.message.toLowerCase() == "hello") {
                context.sendResponse("Hey there " + event.sender + " Would you like to read Wired or Techcrunch?");
            }
            
            // Get the user's publication preference
            else if((event.message.toLowerCase() == "wired") || (event.message.toLowerCase() == "techcrunch")) {
                setPreference(event.message);      
            }
            
            // If the user types in news, make a call to the publiation's RSS feed.
            else if (event.message == "news" ) {
                   context.simplehttp.makeGet('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2F' + context.simpledb.roomleveldata.publication + '.com%2Ffeed');
            }
            
            else {
                context.sendResponse('Not sure what you mean. Type in news to see the latest news or type hello to choose from a list of publications'); 
            }
}

// This method sets the user's preference using roomleveldata.
function setPreference (pref) {
            context.simpledb.roomleveldata.publication = pref;
            context.sendResponse("Type 'news' to get latest headlines on " + context.simpledb.roomleveldata.publication);
        }
        
/** Functions declared below are required **/
function EventHandler(context, event) {
    if(! context.simpledb.botleveldata.numinstance)
        context.simpledb.botleveldata.numinstance = 0;
    numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
    context.simpledb.botleveldata.numinstance = numinstances;
    context.sendResponse("Thanks for adding me. You are:" + numinstances);
}

// This method handles the response from any HTTP call
function HttpResponseHandler(context, event) {
            var respJson = JSON.parse(event.getresp); //the JSON response is parsed
            var stories = respJson.items;  //parsing the JSON
            var resp = "";
            
            
            //The response usually has 10-15 stories. Generate a random number to show the user a random article
            var randomnumber = Math.floor(Math.random() * (stories.length - 1 + 1)) + 1;
            
            //What the user sees is the headline and a link to the story. The JSON contains other details such as author name, thumbnail etc.
            resp = resp + stories [randomnumber].title + "\n" + stories[randomnumber].link + "\n";
            
            resp = resp.replace("&nbsp", "");
            context.sendResponse(resp);
        }

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}