module.exports = {
  name: "dbeval",
  run: async (client, message, args, db) => {
    switch(message.author.id){
      case '524643550546362378':
      case '146681835491950592':
          await db.eval(args).then((res) => {
            message.channel.send(JSON.stringify(res));
          })
          .catch((e) => {
            message.channel.send(e);
          })
      break;
      default: return;
    }
  }
}