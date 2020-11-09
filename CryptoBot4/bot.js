const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('1192006288:AAGs-H6xGAM-nY2axq0bhcHakIgjqpC2tXY');
const apiKey = '1783f027b82aaae08ce6b8fc2c7c48e53f1c935ad1acf84d28e2a23eac96e077'
 
bot.command('start', ctx=>{
    sendStartMessage(ctx);
   
})

bot.action('start', ctx=>{
    ctx.deleteMessage();
    ctx.answerCbQuery('Wait');
    sendStartMessage(ctx);
})

function sendStartMessage(ctx){
    let startMessage = 'Welcome, this bot gives you cryptocurrency information';
    bot.telegram.sendMessage(ctx.chat.id, startMessage,{
        reply_markup: {
            inline_keyboard: [
                [
                    {text:'Crypto Prices', callback_data:'price'}
                ],
                [
                    {text:'CoiMarketCap', url: 'https://coinmarketcap.com/'}
                ],
                [
                    {text:'Bot Info', callback_data:'info'}
                ]
            ]
        }

    })
}

bot.action('price', ctx=>{
    let priceMessage = 'Get Price Information. Select one of the cryptocurrencies below';
    ctx.deleteMessage();
    ctx.answerCbQuery('Wait');
    bot.telegram.sendMessage(ctx.chat.id, priceMessage,{
        reply_markup: {
            inline_keyboard: [
                [
                    {text:'BTC', callback_data:'price-BTC'},
                    {text:'ETH', callback_data:'price-ETH'}
                ],
                [
                    {text:'BCH', callback_data:'price-BCH'},
                    {text:'LTC', callback_data:'price-LTC'}
                ],
                [
                    {text:'Back to Menu', callback_data:'start'}
                ]
            ]
        }
    })
})

let priceActionList=['price-BTC', 'price-ETH', 'price-BCH', 'price-LTC'];
bot.action(priceActionList, async ctx=>{
    ctx.answerCbQuery('Wait');
    let symbol= ctx.match.split('-')[1];
    console.log(symbol);
try {
    let res=await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD,EUR&api_key={apiKey}`);
     let data =res.data.DISPLAY[symbol].USD;
     console.log(data)

     let message =
     `
     Symbol: ${symbol}
     Price: ${data.PRICE}
     Open: ${data.OPENDAY}
     High: ${data.HIGHDAY}
     Low: ${data.LOWDAY}
     Supply: ${data.SUPPLY}
     Market Cap: ${data.MKTCAP}
     `; 
     //ctx.deleteMessage();
     bot.telegram.sendMessage(ctx.chat.id, message,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: 'Back to prices', callback_data:'price'}
                    ]
                ]
            }
        } )
}catch(err){
    console.log(err);
    ctx.reply('Error Encountered')
}
})

bot.action('info', ctx=>{
    ctx.answerCbQuery('Info');
    bot.telegram.sendMessage(ctx.chat.id, 'Bot Info',{
    reply_markup: {
        keyboard: [
                [
                    { text: "Credits" },
                    { text: "API"}
                ],
                [
                    { text: "Remove Keyboard"}
                ]

            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

bot.hears('Credits', ctx =>{
    ctx.reply('This bot was made by Ardit Gjeta')
})
bot.hears('API', ctx =>{
    ctx.reply('This bot uses cryptocurrency')
})
bot.hears('Remove Keyboard', ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, 'Removed Keyboard',{
        reply_markup: {
            remove_keyboard: true
        }
    })
})
bot.launch();