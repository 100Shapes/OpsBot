var Botkit = require('botkit') // require botkit module  
var token = process.env.SLACK_TOKEN // get slack token passed as variable

// Setup new slackbot with botkit
var controller = Botkit.slackbot({  
  debug: false,
  json_file_store: 'data'
});

// Check that token was passed
if (!token) {  
  console.error('SLACK_TOKEN is required')
}

// Start Slack’s Bot Real Time Messaging API (RTM)
controller.spawn({  
  token: token
}).startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error(err)
  }
});

controller.hears(['hi'], ['direct_mention','direct_message'], function(bot, message) {

  var userID = message.user // the ID of the user that mentioned 'up'
  var user = "<@"+userID+">" // wrap around like this to create an @ mention of the user

  controller.storage.users.save({id: message.user, objectives:"Object content *here*"});

  bot.reply(message, {
  	text: "Nice to meet you " + user
  }); // send reply
})

controller.hears(['objectives'], ['direct_mention','direct_message'], function(bot, message) {

  var userID = message.user // the ID of the user that mentioned 'up'
  var user = "<@"+userID+">" // wrap around like this to create an @ mention of the user
  
  controller.storage.users.get(message.user, function(err, user_data) {  
    bot.reply(message, {
      text: user + ' ' + user_data.objectives
    });
  });
})