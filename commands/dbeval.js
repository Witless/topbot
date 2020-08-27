module.exports = {
  name: "dbeval",
  run: async (client, message, args, db) => {
    switch(message.author.id){
      case '{add_here_your_user_id}':
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