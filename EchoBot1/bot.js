const Telegraf = require('telegraf');

const bot = new Telegraf('1352923445:AAFu-CEmhGyihLeMoid2PosdGsuxbiLaA2Y');

const helpMessage= `
Say somthing to me
/start - start the bot
/help - help command
/echo <msg> - echo a message
/echo - "You said Echo"`;

bot.use((ctx, next)=>{
    console.log(ctx.chat);
   if(ctx.updateSubTypes[0]== 'text'){
    
    bot.telegram.sendMessage(-265896180,ctx.from.username +' said:' + ctx.message.text);
   }else{
  
   bot.telegram.sendMessage(-265896180,ctx.from.username +' sent:' + ctx.updateSubTypes);
   }
   next();
})

bot.start((ctx)=>{
  
    ctx.reply(`Hey, say somthing`);
    ctx.reply(helpMessage);
})

bot.help((ctx)=>{
    
    ctx.reply(helpMessage);
})

bot.command('echo',(ctx)=>{
    
    let input = ctx.message.text;
    let inputArray =input.split(" ");

let Message = "";
if(inputArray.length==1){
    Message='You said Echo'
}else{
  inputArray.shift();
    Message=inputArray.join(" ");
}
ctx.reply(Message);
})


bot.launch()