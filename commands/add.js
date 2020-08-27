module.exports = {
  name: "add",
  run: async (client, message, args, db) => {

    let userAdded = client.users.cache.get(args[1])
    switch (userAdded) {
      case undefined:
      message.channel.send("No he podido encontrar al usuario")
      break;
      default:
        await db.addTop(args[0], args[1], args[2])
          .then(() => {
            message.react("✅")
          })
          .catch((e) => {
            message.channel.send("ERROR: " + e)
          })
    }
  }
}
