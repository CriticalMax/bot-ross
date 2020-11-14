require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const fetch = require("node-fetch");

client.on('ready', () => {
    console.log(`${client.user.tag} has joined!`)
});

client.on('message', (message) => {
    if(message.author.bot) {return}
    
    const messageSplit = message.content.split(' ');
    if(messageSplit[0] !== '!bot') {return}
    
    switch(messageSplit[1]) {
        case 'w2g':
            if (messageSplit[2] === null || messageSplit[2] === undefined || messageSplit[2] === "") {return}
            const body = { 
                "w2g_api_key" : process.env.W2G_KEY,
                "share" : messageSplit[2],
                "bg_color" : "#383838",
                "bg_opacity" : "50"
            }

            fetch ('https://w2g.tv/rooms/create.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                    })
                    .then(response => response.json())
                    .then((data) => {
                        message.channel.send(`https://w2g.tv/rooms/${data.streamkey}`);
                    });
            return;
    }
});

client.login(process.env.BOT_TOKEN);