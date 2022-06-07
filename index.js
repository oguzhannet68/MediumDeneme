const  express = require('express');
const axios = require('axios');
const app = express();

const TelegramBot = require('node-telegram-bot-api');
const token = '5543251251:AAF5qTh37dvExQ11kaTnY20xzBSnE5gm3-Y' // BotFather üzerinden aldığımız token. Benim tokenimi yazmayın. :)
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
        fiyat.getPrice('https://www.laptopfirsati.com/samsung-ssd-980-1tb-3500mb-s-3000mb-s-nvme-14-pcie-gen-30-x4-m2-ssd-mz-v8v1t0bw-5-yil-samsung-turkiye-garantili-pmu1608').then(price => {
            let moneyformat = price.slice(0, -2) + "." + price.slice(-2);
            bot.sendMessage(chatId, 'Fiyat: ' + moneyformat + ' TL');
        })
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`server started on port ${PORT}`))