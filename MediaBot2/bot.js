const telegraf = require('telegraf');
const bot = new telegraf('1281111462:AAES7_txKvFIfysr_g4sw4aBu2yvf5REuBU');

bot.command(['start', 'help'], ctx=>{
    let msg = `Help reference:
    /sadaharun28 - get a photo of Sadaharu Number 28
    /gintoki - get a photo of Gin-sama
    /bestAnime - get a gif of an anime
    /animes - get a lot photos of animes
    /top10anime - get a .txt file with a top list
    /japan - get location of Japan
    If you upload a photo or a file, you will get download link of that photo or file`;
    ctx.reply(msg);
})



bot.command('sadaharun28', ctx =>{
    bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo')
     bot.telegram.sendPhoto(ctx.chat.id, "https://i.pinimg.com/236x/5d/e9/90/5de990d2de0a1433a6b7f606f0c839d3.jpg");

});
bot.command('gintoki', ctx=>{
    bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo')
    bot.telegram.sendPhoto(ctx.chat.id,
        {
        source: 'res/gintoki.jpg'
        },
        {
            reply_to_message_id:ctx.message.message_id
        }
        )
})

bot.command('bestAnime', ctx=>{
    bot.telegram.sendChatAction(ctx.chat.id, 'upload_video')
    bot.telegram.sendAnimation(ctx.chat.id,
        'https://media.giphy.com/media/jcEdy5NcGz2tG/giphy.gif',
        {
            reply_to_message_id:ctx.message.message_id
        }
        )
})

bot.command('animes', ctx=>{
    bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo')
    let animes = ['res/gintama.jpg','res/hehe.jpg','res/shinpachi.jpg','res/gintoki.jpg','res/sadaharun28.jpg'];
    let result = animes.map(anime =>{
        return{
        type: 'photo',
        media:{
        source: anime
        }
    }
})

bot.telegram.sendMediaGroup(ctx.chat.id,
    result
    )
})

bot.command('top10anime', ctx=>{
    bot.telegram.sendDocument(ctx.chat.id, {
        source: 'res/top10anime.txt'
    },
    {
        thumb: {source:'res/hehe.jpg'}
    }
        )

})
bot.command('japan', ctx=>{
    bot.telegram.sendLocation(ctx.chat.id, 36.2048,138.2529)
})

bot.on('message', async ctx=>{
    if(ctx.updateSubTypes[0]=='document'){
        try{
       let link = await bot.telegram.getFileLink(ctx.message.document.file_id);
        ctx.reply('Your download link: '+link)
    }catch(err){
            console.log(err)
            ctx.reply(err.description)
        }
       
    }else if(ctx.updateSubTypes[0]=='photo'){
       try{
        let jpg = await bot.telegram.getFileLink(ctx.message.photo[0].file_id);
        ctx.reply(jpg)
       }catch(err){
           console.log(err);
           ctx.reply(err.description);
       }
    }
})

bot.launch();
