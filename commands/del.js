module.exports = {
  name: "del",
  run: async (client, message, args, db) => {

    let user = client.users.cache.get(args[1])
    switch(user) {
      case undefined:
      return message.channel.send("No he podido encontrar al usuario")
      break;
      default:
      return await db.delTop(args[0], args[1])
          .then(() => {
            message.react("✅")
          })
          .catch((e) => {
            message.channel.send("ERROR: " + e)
          })
    }
  }
}