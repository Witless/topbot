exports.init = async (discord_client, message_embed) => {

  const schedule = require("node-schedule-tz");
  const conn2 = await require("./connector").init();
  const client = discord_client;
  /**
   * In case there wasn't already a hash, create them
   * */
  conn2.hgetall("cachedversions", (err, val) => {
      if(err || !val )
          conn2.hset("cachedversions", "0", "0")
  })
  conn2.hgetall("guilds", (err, val) => {
      if(err || !val){
          conn2.hset("guilds", "0", "0")
      }
  })
  if(client && conn2){
    schedule.scheduleJob('*/2 * * * * *', () => {  //Execute every minute
      watcher(conn2, client, message_embed);
    })
  }

}

watcher = async (conn, client, message_embed) => {

  const dbGetV= require("./database").getV;


    conn.hgetall("cachedversions", async (err, val) => {

        for (let id in val) {
            if (id !== "0"){
                let cached_v = await dbGetV("cachedversions", id);
            let current_v = await dbGetV(id, "_v");
            let flagIncrement = 1

            if (cached_v !== current_v) { //This means there was something changed from previous version

                let hash_table = await require("./database").getAll(id); //Get the hash_table from the provided ID
                let server_id = id.split('_')[0];
                let channel_id = hash_table.channel;
                let message_id = hash_table.message;

                let sortable = [];   //Initialize sortable array to sort the object return from hgetall

                for (var idnt in hash_table) {
                    if (idnt !== "_v" && idnt !== "message" && idnt !== "channel") //Exclude env from sorting
                        sortable.push([idnt, hash_table[idnt]]);
                }

                sortable.sort(function (a, b) {
                    return b[1] - a[1];
                });


                //DISCORD STUFF

                let stringToSend = "";
                for (let i = 0; i < sortable.length; i++) {
                    stringToSend += "\n<@" + sortable[i][0] + "> > " + sortable[i][1] + "\n"
                }

                const embed = new message_embed()

                await client.guilds.cache.get(server_id).channels.cache.get(channel_id).messages.fetch(message_id)
                    .then((msg) => {

                        let embed_title = msg.embeds[0].title;
                        let embed_color = msg.embeds[0].color;

                        embed

                            .setTitle(embed_title)
                            .setColor(embed_color)
                            .setDescription(stringToSend)
                            .setFooter(id);

                        msg.edit(embed)

                    })
                    .catch(() => {
                        const drop = require("./database").dropTop
                        drop(id);
                        flagIncrement = 0;
                    })


                if (flagIncrement)
                    conn.hset("cachedversions", id, current_v)
            }
        }
      }
    })
}