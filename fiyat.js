const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    getPrice: async (url) => {
        try {
            const html = await axios.get(url);
            const $ = await cheerio.load(html.data);
            let veri = $("body").find(".urun_fiyati").text();
            let parcala = veri.split("-");
            let fiyat = parcala[0].replace(/\D/g, '');
            return fiyat;
        } catch (error) {
            console.log(error);
        }
            
        
    }
}