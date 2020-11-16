module.exports  = {
    botCommand: "!bot",
    w2g: {
        createRoom: {
            uri: "https://w2g.tv/rooms/create.json",
            options: {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    "w2g_api_key" : process.env.W2G_KEY,
                    "share" : "",
                    "bg_color" : "#383838",
                    "bg_opacity" : "50"
                }),
            },
            replyUrl: "https://w2g.tv/rooms/",
            errors: {
                missingUri: "Lost! Gib mir ne URL: ```js\n!bot w2g https://youtu.be/dQw4w9WgXcQ?t=42```"
            }
        }
    }
}