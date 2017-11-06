const Discord = require("discord.js");
const client = new Discord.Client();
var owjs = require("overwatch-js");


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg =>{

  if (msg.author.id == client.user.id) return;
  if (msg.content === 'ping') {
    msg.reply('Pong');
    console.log("Command executed successfully: " + msg.content);
  }

  if(msg.content === '!hello'){
    client.channels.get(msg.channel.id).send({
                      embed: {

                          color: 5423454,
                          "timestamp": new Date(),
                          description: "hey",
                      }
                  });
                  console.log("Command executed successfully: " + msg.content);
  }

  if(msg.content === '!status'){
    client.channels.get(msg.channel.id).send("I'm alive");
    console.log("Command executed successfully: " + msg.content);
  }


var x = msg.content;
if(String(x).startsWith("!num")){
  x = x.split(" ");
    if(isNaN(x[1])){
    msg.reply("It's not a number");
    } else{
    msg.reply("It's a number");
  }
  console.log("Command executed successfully: " + x);
}

  var msgcontent = msg.content;
  if(String(msgcontent).startsWith("calc")){
  msgcontent = msgcontent.split(" ");
  if(msgcontent[2] === "x"){
    var total = parseInt(msgcontent[1]) * parseInt(msgcontent[3]);
    client.channels.get(msg.channel.id).send("Result: "+ total);
  }
  else if(msgcontent[2] === "+"){
    var total = parseInt(msgcontent[1]) + parseInt(msgcontent[3]);
    client.channels.get(msg.channel.id).send("Result: "+ total);
  }
  else if(msgcontent[2] === "-"){
    var total = parseInt(msgcontent[1]) - parseInt(msgcontent[3]);
    client.channels.get(msg.channel.id).send("Result: "+ total);
  }
  else if(msgcontent[2] === "/"){
    var total = parseInt(msgcontent[1]) / parseInt(msgcontent[3]);
    client.channels.get(msg.channel.id).send("Result: "+ total);
  }
  console.log("Command executed successfully: " + msgcontent);
}

/*if(msg.content === "!time"){
  var timeandDate = require("node.date-time");
//  console.log(new Date().format("d-M-Y"));
  msg.reply(new Date().format("d-M-Y H:m:S"));
}*/
if(msg.content === "!time"){
  client.channels.get(msg.channel.id).send({
        embed:{
          color: 5423454,
          description: "Local time: " + new Date(),
        }
  })
  console.log("Command executed successfully: " + msg.content);
}
//  msg.reply(new Date().format("d-M-Y H:m:S"));

//overwatch here

var overwatchRank = msg.content;
if(String(overwatchRank).startsWith("!rank")){
  overwatchRank = overwatchRank.split(" ");
  owjs.
        getOverall(overwatchRank[1], overwatchRank[2], overwatchRank[3])
//        then((data) => client.channels.get(msg.channel.id).send("Nick: " + data.profile.nick + "\n" + "Rank: " + data.profile.rank + "(" + data.profile.ranking + ")"));
          .then((data) => client.channels.get(msg.channel.id).send({
                  embed:{
                    color: 5423454,
                    description : "Username: " + data.profile.nick +  "\n" + "Rank: " + data.profile.rank + "(" + data.profile.ranking + ")" + "\n" + "Level: " + data.profile.tier + data.profile.level + "\n",
                    thumbnail: {url: data.profile.rankPicture}
                  }
          }))
          .catch((function(error){

              client.channels.get(msg.channel.id).send("" + error);
            }
          )
        );
}

console.log(new Date() + " " + msg.author.username + " => Input: " + msg.content);
});


//Grabbing auth data


try{
  var authToken = require("./token.json");
} catch(e){
      console.log("A token file does not exist \n" + e.stack);
      process.exit();
      }
if(authToken.token){
      client.login(authToken.token);
    }else{
      console.log("Error logging in. There might be a problem with the token file.")
    }
