const Discord = require('discord.js');
const keep_alive = require('./keep_alive.js')
const weather = require('weather-js')
const bot = new Discord.Client();
const token = process.env.TOKEN;
const ms = require('parse-ms');
const cooldown = new Set(); 
const db = require('quick.db');

let PREFIX 

// Episode 5 ->

const fs = require('fs');
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./src').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./src/${file}`);
  bot.commands.set(command.name, command);
}

// Episode 9 ->

bot.on('message', async message => {

  if (db.get(`prefix_${message.guild.id}`) === null) {
    PREFIX = "_"
  }

  else {
    PREFIX = db.get(`prefix_${message.guild.id}`)
  }

})

// ... <-

bot.on('ready', () => {
console.log("Online")

});

bot.on('message', async message => {
if (!message.content.startsWith(PREFIX)) return;

let args = message.content.slice(PREFIX.length).split(" ");
let command = args.shift().toLowerCase()

// Episode 2 ->

if (command === "ping"){ 
  bot.commands.get('ping').execute(message, args)
}
if (command === 'report'){
  bot.commands.get('report').execute(bot,message,args)
}

if (command === "clear"){ 
  bot.commands.get('clear').execute(message, args)
}

if (command === "beep"){
 bot.commands.get('beep').execute(message, args)
}

// Episode 3 ->

if (command === "agl"){
  bot.commands.get('agl').execute(message, args)
}

// Episode 6 ->

if (command === "rand") {
  bot.commands.get('rand').execute(message, args, Discord)
}

// Episode 7 ->

if (command === "math") {
  bot.commands.get('math').execute(message, args)
}

// Episode 8 ->

if (command === "8ball") {
  bot.commands.get('8ball').execute(message, args)
}

// Episode 9 ->

if (command === "prefix") {
  bot.commands.get('prefix').execute(message, args, db)
}


if (command === "ban") {
  bot.commands.get("ban").execute(bot, message, args, Discord)
}


// ... <-

// Episode 13 ->

if (command === "weather") {
  bot.commands.get("weather").execute(message, args, Discord, weather)
}

// Episode 14 ->

if (command === "removerole") {
  bot.commands.get("removerole").execute(message, args)
}

if (command === "unban") {
  bot.commands.get("unban").execute(bot, message, args, Discord)
}

if (command === "purge") {
  bot.commands.get("purge").execute(message, args)
}

// ... <-

// Episode 15 ->

if (command === "help") {
  bot.commands.get("help").execute(bot, message, args, Discord, commandFiles)
}

});
bot.login(token);

const discord = require('discord.js')
const config = require('./config.json')
const db1 = require('quick.db')

bot.on("ready", async () => {
  console.log(`Bot Is Ready To Go - ${bot.user.tag}`);
});

const { badwords } = require("./data.json") 

bot.on('message', message => {



    let confirm = false;
   
    var i;
    for(i = 0;i < badwords.length; i++) {
      
      if(message.content.toLowerCase().includes(badwords[i].toLowerCase()))
        confirm = true;


      
    }

    if(confirm) {
      const log = bot.channels.cache.get(config.channel);
const user = message.member
              const logEmbed = new discord.MessageEmbed()
        .setTitle(`${message.author.username} написал мат!`)
        .setDescription(`Сообщение: ${message.content}`)

      message.delete()
      message.channel.send(`**${message.author}, У тебя нет прав на это!+1 варн!Больше варнов-мут!**`)
      log.send(logEmbed)
      db1.add(`warns_${message.author}`, 1)

      const warns = db1.fetch(`warns_${message.author}`)

      if (warns > 2) {
          const member = message.guild.roles.cache.find(
 (role) => role.name === 'Участник'
);

const mute = message.guild.roles.cache.find(
 (role) => role.name === 'Muted'
);

const chatEmbed = new discord.MessageEmbed()
.setColor("RED")
.setDescription(`**${user} замучен за маты!.**`)

user.roles.add(mute)
user.roles.remove(member)
message.channel.send(chatEmbed)
      }
      
      
    }    
   
 
})
