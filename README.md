# topbot
 
tops bot for discord

## Purpose

Discord bot to make any top, sorted from highest to lowest score

## Why?

I mean, it's a weird concept that might not be useful at all, but I learned Redis whilest making it so that's what counts! 

## Installation

The bot has it's own DataBase, yes you guessed it right, a Redis database, so you must install a Redis server first

**Installing Redis server** 

If you are a Windows user, consider reading this [guide](https://riptutorial.com/redis/example/29962/installing-and-running-redis-server-on-windows), for Ubuntu users you can check this other [one](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04)

If your OS doesn't match any of the other two, there are tons of guides around the internet!

Now that we have our Redis server installed, let's install the dependencies

**Installing dependencies**

On your root directory run 
```bash
npm install 
```

Now let's set the enviroment variables, let's set up our **.env** , first by creating it

**Setting up .env**

Create your .env file, for Linux distros use 
```bash
touch .env
```

For Windows command line:
```bash
type NUL > .env
```

On this file add the following template:
```
TOKEN=
REDIS_PASS=
REDIS_IP=
PREFIX=
```
For "TOKEN" field add your Discord bot Token, for "REDIS_PASS" add the Redis password in case there is any, at "REDIS_IP" you must place the IP addres where your Redis server is at, if it's locally, use 127.0.0.1, on "PREFIX" you may set the prefix the bot will recognize, if there's nothing there it'll be "!"
The Redis Port the client will attempt to connect to is *6390* , you can change it by modifying /connector.js file

**Running the bot** 

Now that everything is set up, let's run our bot by typing in the root directory
```bash
node index.js
```

## Contributing

Any kind of addition/help/PR is highly welcomed <3

## License

[MIT](https://choosealicense.com/licenses/mit/)

This bot uses [DiscordJS12](http://discord.js.org/) and [Node Redis](https://www.npmjs.com/package/redis) as their main dependencies


