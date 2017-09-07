const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
// replace the value below with the Telegram token you receive from @BotFather
const token = '392281853:AAGHZFrSusnrgOHksYIb8eQ3M-2vi5gq0Xo';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;


    if (msg.text ==="/0") {


        http.get("http://api.apixu.com/v1/forecast.json?key=7acd069474e54496b6374656170709&q=Lviv", res => {
            var body = "";

            // Read the data
            res.on("data", function (chunk) {
                body += chunk;
            });

            res.on("end", function () {

                // Parse the data
                body = JSON.parse(body);
                var p = Promise.resolve()
                    .then(() => bot.sendMessage(chatId, 'Weather for today:'))
                    .then(() => bot.sendMessage(chatId, 'HOUR | TEMP | RAIN | WIND'))
                    .then(() => {
                        var d = new Date();
                        var h = d.getHours();
                        body.forecast.forecastday[0].hour.map((item) => {

                            if (JSON.stringify(item.temp_c).length === 4) { var t = "" }
                            else if (JSON.stringify(item.temp_c).length === 3) { var t = " " }
                            else if (JSON.stringify(item.temp_c).length === 2) { var t = "  " }
                            else if (JSON.stringify(item.temp_c).length === 1) { var t = "   " }

                            if (JSON.stringify(item.time).slice(12, 14) >= h) {
                                p = p.then(() => bot.sendMessage(chatId, `${JSON.stringify(item.time).slice(11, 17)}     ${item.temp_c}\xB0C${t}    ${item.chance_of_rain}%     ${item.wind_kph} km/s`))
                            }
                        })
                    })
            })
        }
        )
    }
    else if (msg.text === "/1") {
        http.get("http://api.apixu.com/v1/forecast.json?key=7acd069474e54496b6374656170709&q=Lviv&days=2", res => {
            var body = "";

            // Read the data
            res.on("data", function (chunk) {
                body += chunk;
            });

            res.on("end", function () {

                // Parse the data
                body = JSON.parse(body);
                var p = Promise.resolve()
                    .then(() => bot.sendMessage(chatId, 'Weather for tomorrow:'))
                    .then(() => bot.sendMessage(chatId, 'HOUR | TEMP | RAIN | WIND'))
                    .then(() => {
                        var d = new Date();
                        var h = d.getHours();
                        body.forecast.forecastday[1].hour.map((item) => {

                            if (JSON.stringify(item.temp_c).length === 4) { var t = "" }
                            else if (JSON.stringify(item.temp_c).length === 3) { var t = " " }
                            else if (JSON.stringify(item.temp_c).length === 2) { var t = "  " }
                            else if (JSON.stringify(item.temp_c).length === 1) { var t = "   " }

                        
                                p = p.then(() => bot.sendMessage(chatId, `${JSON.stringify(item.time).slice(11, 17)}     ${item.temp_c}\xB0C${t}    ${item.chance_of_rain}%     ${item.wind_kph} km/s`))
                        
                        })
                    })
            })
        }
        )
    }
    else if (msg.text === "/2") {
        http.get("http://api.apixu.com/v1/forecast.json?key=7acd069474e54496b6374656170709&q=Lviv&days=3", res => {
            var body = "";

            // Read the data
            res.on("data", function (chunk) {
                body += chunk;
            });

            res.on("end", function () {

                // Parse the data
                body = JSON.parse(body);
                var p = Promise.resolve()
                    .then(() => bot.sendMessage(chatId, 'Weather for day after tomorrow:'))
                    .then(() => bot.sendMessage(chatId, 'HOUR | TEMP | RAIN | WIND'))
                    .then(() => {
                        var d = new Date(); 
                        var h = d.getHours();
                        body.forecast.forecastday[2].hour.map((item) => {

                            if (JSON.stringify(item.temp_c).length === 4) { var t = "" }
                            else if (JSON.stringify(item.temp_c).length === 3) { var t = " " }
                            else if (JSON.stringify(item.temp_c).length === 2) { var t = "  " }
                            else if (JSON.stringify(item.temp_c).length === 1) { var t = "   " }

                        
                                p = p.then(() => bot.sendMessage(chatId, `${JSON.stringify(item.time).slice(11, 17)}     ${item.temp_c}\xB0C${t}    ${item.chance_of_rain}%     ${item.wind_kph} km/s`))
                          
                        })
                    })
            })
        }
        )
    }
}


);