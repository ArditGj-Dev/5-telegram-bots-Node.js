const Telegraf = require ('telegraf');
const axios = require ('axios');
const bot = new Telegraf('1444491563:AAGhEJ0wjWMrPBJdySXvryF1cddTq0Ymy3Y');
const apiKey = '18957683-98dc9fc4ddbda045bcb6a337e'

bot.command(['start', 'help'], ctx=>{
    let message = `
    Welcom to Search Bot
    Use the inline mode below
    @search103_bot p <search image>
    @search103_bot w <search wikipedia>
    `;
    ctx.reply(message, {
        reply_markup: {
            inline_keyboard:[
                [
                    {text: 'Search pixabay Image', switch_inline_query_current_chat: 'p '}
                ],
                [
                    {text: 'Search Wikipedia', switch_inline_query_current_chat: 'w '}
                ]
            ]
        }
    })
})



bot.inlineQuery(/p\s.+/,async ctx =>{
  
  let input = ctx.inlineQuery.query.split(' ');
  input.shift();
  let query = input.join(' ');

    let res = await axios.get(`https://pixabay.com/api/?key=${apiKey}&q=${query}`);
    let data = res.data.hits;
    console.log(data);
    
    let results = data.map((item, index)=>{
        return{
            type: 'photo',
            id: String(index),
            photo_url: item.webformatURL,
            thumb_url: item.previewURL,
            photo_width: 300,
            photo_height: 200,
            caption: `[Source](${item.webformatURL})\n[Large Image](${item.largeImageURL})`,
            parse_mode: 'Markdown'
        }
    })
    ctx.answerInlineQuery(results)
})

bot.inlineQuery(/w\s.+/,async ctx =>{
  
    let input = ctx.inlineQuery.query.split(' ');
    input.shift();
    let query = input.join(' ');
  
    let res = await axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&limit=50`);
    let data = res.data;
    let allTitles = data[1];
    let allLinks = data[3];

    if(allTitles == undefined){
        return;
    }
    let results = allTitles.map((item, index) =>{
        return{
            type: 'article',
            id: String(index),
            title: item,
            input_message_content: {
                message_text: `${item}\n${allLinks[index]}`
            },
            description: allLinks[index],
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: `Share ${item}`, switch_inline_query: `${item}`}
                    ]
                ]
            }
        }
    })
    ctx.answerInlineQuery(results);
})

bot.launch();