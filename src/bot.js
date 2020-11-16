require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const fetch = require("node-fetch");
const botInfo = require("./botInfo");

client.on('ready', () => {
    console.log(`${client.user.tag} has joined!`)
});

client.on('message', (message) => {
    if(message.author.bot) {return}

    const messageSplit = message.content.split(' ');
    const botCommands = botInfo.botCommands.map(a => a.name);
    const botAlias = botInfo.botCommands.map(a => a.alias);

    if(messageSplit[0] !== botInfo.botTrigger) {return}
    if(!botCommands.includes(messageSplit[1]) && !botAlias.includes(messageSplit[1]) ) {
        message.channel.send(botInfo.botErrors.commandNotFound);
        return;
    }

    switch(messageSplit[1]) {
        case 'h':
        case 'help':
            message.channel.send('Available Commands:```js\nw2g\nhelp```');
            return;
        case 'w2g':
            message.suppressEmbeds(true);
            if (messageSplit[2] === null || messageSplit[2] === undefined || messageSplit[2] === "") {
                message.channel.send(botInfo.w2g.createRoom.errors.missingUri)
                return
            }

            botInfo.w2g.createRoom.options.body.share = messageSplit[2];

            fetch (botInfo.w2g.createRoom.uri, botInfo.w2g.createRoom.options)
                .then(response => response.json())
                .then((data) => {
                    message.channel.send(`${botInfo.w2g.createRoom.replyUrl}${data.streamkey}`);
                });
            break;
    }
});

client.login(process.env.BOT_TOKEN);