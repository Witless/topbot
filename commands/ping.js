module.exports = {
  name: "ping",
  run: async (client, message, args, db) => {
    message.channel.send("DB Status: " + await db.testConnection())
    message.channel.send("Websocket: " + client.ws.ping + "ms")
    .then(() => { message.react("✅")})
    .catch((e) => {message.channel.send("ERROR: " + e)
    }
    )
 }
}
