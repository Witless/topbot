let i = 1 // Don't want double consolelog at start

exports.init = () => {

const redis = require("redis");

const redisclient = redis.createClient({host: process.env.REDIS_IP, port: 6390, password:process.env.REDIS_PASS});


redisclient.on("ready", () => {

if(i){
i = 0

console.log(`%c ________________________________________
< REDIS IS READY BOOOOOOOOOOOOOOOOOOOOOY >
 ----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`, "font-family:monospace")

redisclient.get("test", (err, reply) => {
  console.log("test_key: "+ reply);
})

}


})



return redisclient;

}
