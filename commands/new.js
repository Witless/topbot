const Discord = require("discord.js")
module.exports = {
  name: "new",
  run: (client, message, args, db) => {

    let channel_by_ID = message.guild.channels.cache.get(args[0])
    let channel_by_name = message.guild.channels.cache.find(channel => channel.name === args[0])

    let nuevoEmbed = new Discord.MessageEmbed()
    .setTitle(args.slice(1).join(" "))
    .setDescription("No hay ningún usuario en el top aún")
    .setColor("#FF0000")

    if(channel_by_ID) {
      channel_by_ID.send(nuevoEmbed).then((msg) => {
        db.newTop(message.guild.id, "channel", channel_by_ID.id, "message", msg.id)
        .then((id_top)=>{
           message.channel.send("TOP creado, esta es su id, no la pierdas: " + id_top)
        })
        .catch((e)=>{
          message.channel.send("ERROR: " + e)
        })

      })

    } else if (channel_by_name) {
      channel_by_name.send(nuevoEmbed).then((msg) => {
        db.newTop(message.guild.id, "channel", channel_by_name.id, "message", msg.id)
        .then((id_top)=>{
           message.channel.send("TOP creado, esta es su id, no la pierdas: " + id_top)
        })
        .catch((e)=>{
          message.channel.send("ERROR: " + e)
        })

      })
    }
  }
}