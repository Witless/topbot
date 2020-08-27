require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client({fetchAllMembers: true});
const fs = require("fs");
const db = require("./database/database")
const watcher = require("./database/watcher").init(client, Discord.MessageEmbed);


const prefix = process.env.PREFIX ? process.env.PREFIX : "!"
client.commands = new Discord.Collection()

let files = fs.readdirSync("./commands").filter((f) => f.endsWith(".js"))

for (var fil of files) {
 let commandFile = require("./commands/" + fil)
 client.commands.set(commandFile.name, commandFile)
console.log("loaded "+ fil )
}

client.on("ready", () => {
  console.log(`${client.user.tag} on`)
 }
)
client.on("message", (message) => {

   const args = message.content.slice(prefix.length).split(' ');

   const command = args.shift().toLowerCase();

   let cmd = client.commands.get(command)

   return message.channel.type === "md" ? 0
   : message.author.bot ? 0
   : !cmd ? 0
   : cmd.run(client, message, args, db);

    if(!message.member.roles.cache.some(role => role.name === 'Tops')) return message.channel.send("Debes tener un rol llamado Tops para poder realizar este comando");

 }
)

client.login(process.env.TOKEN)