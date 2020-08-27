const conn = require("./connector").init();

exports.test = () => {
  conn.hdel("toprandom", "pang")
  conn.hgetall("toprandom", (err, val) => {
    console.log(val);
  })
}

exports.eval = (args) => {
  return new Promise ((resolve, reject) => {
    conn.send_command(args[0], args.slice(1), (err, res) => {
      !err ? resolve(res) : reject("error")
  })
  })
}

exports.testConnection = () => {

  return new Promise ((resolve, reject) => {
  conn.send_command("ping", (err, res) => {
      res ? resolve("up") : resolve("down")
  })
  })
}

exports.getAll = (hkey) => {

  return !hkey ? "hkey must be provided"
  : new Promise(async (resolve, reject) => {
     await conn.hgetall(hkey, (err, val) => {
          val ? resolve(val)
            : reject(err)
    })
  })

}

exports.addTop = (hkey, key, value) => {
  return !hkey ? "hkey must be provided"
    : !key ? "key must be provided"
    : !value ? "value must be provided"
    : new Promise (async (resolve, reject) => {
      await conn.hgetall(hkey, (err, val) => {
          if(!val)
            reject(err)
          else if(val[key])
            reject("key already exists")
          else{
            val[key] = value;
            conn.hmset(hkey, val, (err, res) => {
               err ? reject(err) : updateV(hkey)
               resolve(res)
            })
          }

      })
    })
}

exports.delTop = (hkey, key) => {
  return !hkey ? "hkey must be provided"
    : !key ? "key must be provided"
    : new Promise (async (resolve, reject) => {
      await conn.hdel(hkey, key, (err, res) => {

          if(!err){
          updateV(hkey)
          resolve(res)
          }else
            reject(err)

      })
    })
}

exports.updateTop = (hkey, key, value) => {
  return !hkey ? "hkey must be provided"
    : !key ? "key must be provided"
    : !value ? "value must be provided"
    : new Promise (async (resolve, reject) => {
      await conn.hgetall(hkey, (err, val) => {

          if(!val)
            reject(err)
          else if(!val[key])
            reject("key does not exist")
          else{
            val[key] = value;
            updateV(hkey);
            conn.hmset(hkey, val, (err, res) => {
               res ? resolve(res) : reject(err)
            })
          }

      })
    })
}

exports.dropTop = (id) => {

  conn.hdel("cachedversions", id, (err, res) => {
    if(err)
      console.log("ERR "+err)
    else
      console.log("RES "+ res)
  })
  conn.del(id)
}

exports.newTop = async (hkey, key, value, key2, value2) => {

  if(!key || !key || !value || !key2 || !value2)
    return "all args must be provided"

    let num = await exports.getFromTops(hkey) //Get how many
      .catch((e) => {return e} );

    return new Promise (async (resolve, reject) => {
      let name = hkey+ "_"+num;
      num++; //Prepare guilds object for next top name
      conn.hmset("cachedversions", name, "0", (err, res) => {
        if (res){
        conn.hmset(name, key, value, key2, value2, "_v", "0", (err, res) => {

          err ? reject(err) : conn.hset("guilds", hkey, num, async (err, res) => { //Save guilds object with new num associated to it (incr +1)
            err ? reject(err) : resolve(name)
          })
        })
      }else
        reject(err)
      })

    })



}

exports.getFromTops = (key) => {
  return !key ? "hkey must be provided"
    : new Promise (async (resolve, reject) => {
      conn.hget("guilds", key, async (err, res) => {
          if(res)   //IF there's res return that num, if there's not, create key + value (0) at object and add it
            resolve(res)
          else{
              val = await exports.getAll("guilds")
              val[key] = "0";
              conn.hmset("guilds", val, (err, res) => {
                res ? resolve("0") : reject(err)
              })
          }

      })
    })
}


updateV = (hkey) => {
  conn.hget(hkey, "_v", (err, val) => {
            let new_v = parseInt(val) + 1;
              conn.hset(hkey, "_v", new_v, (err, res) => {
                return err ? err : "1"
              })
          })
}

exports.getV = (hkey, key) => {

  return new Promise (async (resolve, reject) => {

          conn.hget(hkey, key, (err, res) => {
              if(!err)
                resolve(res)
              else
                reject(err)
            })

  })

}