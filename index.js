var Botkit = require('botkit') // require botkit module  
var token = process.env.SLACK_TOKEN // get slack token passed as variable

// Setup new slackbot with botkit
var controller = Botkit.slackbot({  
  debug: false
})

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

controller.hears(['up'], ['direct_mention'], function(bot, message) {

  var userID = message.user // the ID of the user that mentioned 'up'
  var user = "<@"+userID+">" // wrap around like this to create an @ mention of the user

  bot.reply(message, {
  	text: user + " I'm here",
  	icon_emoji: ":dash:"
  }); // send reply
})