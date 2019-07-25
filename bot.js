

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});
client.on('message', message => {
    const prefix = "$";
    const args = message.content.trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command == `${prefix}done`) {
        let mentioned = message.mentions.users.first();
        if (!mentioned) return message.reply("اين المنشن ي غلام")
        const array = ["1", "2", "3", "4", "5"]
        const embed = new Discord.RichEmbed()
            .addField('الرجاء التصويت حسب جودة الخدمة المقدمة اليك', `1 - راضي جداً\n2-راضي\n3- لا بأس\n4- غير راضي\n5- سيء جداً\n\nالرجاء الأختيار من الرقم 1 الى 5\nوبدون اضافة اي كلام اخر\n اضافة اي كلام غير ال ارقام سوف يلغي التصويت`)
        mentioned.send(embed);
        const filter = m => m.author.id === mentioned.id && array.some(answer => answer.toLowerCase() == m.content.toLowerCase());
        client.users.get(mentioned.id).createDM().then(channel => {
            channel.awaitMessages(filter, {
                maxMatches: 1,
                errors: ['time'],
                time: 60000
            }).then(collected => {
                const answer = collected.first().content;
                var hi;
                switch (answer) {
                    case "1":
                        hi = "راضي جداً"
                        break;
                    case "2":
                        hi = "راضي"
                        break;
                    case "3":
                        hi = "لا بأس"
                        break;
                    case "4":
                        hi = "غير راضي"
                        break;
                    case "5":
                        hi = "سيء جداً"
                        break;
                }
                channel.send("شكراً لتصويتك")
                var voted = new Discord.RichEmbed()
                voted.addField('Vote', hi)
                voted.addField('Vote by', mentioned)
                voted.addField('Vote to', message.author)
                client.channels.get("577679776643285004").send(voted)
            }).catch(() => {
                mentioned.send('انتهى الوقت');
            });
        });
    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	client.on('ready', () => {// افنت التشغيل 
  setInterval(function(){
      client.guilds.forEach(g => { // فور ايرج تدخل للسيرفرات كلها
                  var role = g.roles.find('name', 'Rainbow');//Rainbow  اسم الرتبة عشان يسوي ريمبو غيرها اذا تبي
                  if (role) {
                      role.edit({color : "RANDOM"});
                  };
      });
  }, 60000);// وقت الريمبو لا تغيرة لانه الوقت المسموح للتغيير
})




var Enmap = require('enmap');
client.antibots = new Enmap({name: "antibot"});
var antibots = client.antibots;
var julian = client;
julian.on("message", codes => {
var prefix = "-";
if(codes.content.startsWith(prefix + "antibots on")){
if(codes.author.bot || !codes.channel.guild || codes.author.id != codes.guild.ownerID) return;
antibots.set(`${codes.guild.id}`, {
onoff: 'On'
});
 
 
codes.channel.send("AntiBots Join Is On");
}
if(codes.content.startsWith(prefix + "antibots off")){
if(codes.author.bot || !codes.channel.guild || codes.author.id != codes.guild.ownerID) return;
antibots.set(`${codes.guild.id}`, {
onoff: "Off"
});
codes.channel.send("AntiBots Join Is Off");
}
});
 
julian.on("guildMemberAdd", member => {
if(!antibots.get(`${member.guild.id}`)) { antibots.set(`${member.guild.id}`, {
onoff: "Off"
});
}
if(antibots.get(`${member.guild.id}`).onoff == "Off") return;
if(member.user.bot) return member.kick()
});















giftKeys = {};
let devs = ["ايديك","ايدي خويك او إي ادمن"]; // تقدر تضيف ايدي ثالث نفس الفكره تسوي كذا let devs = ["ايديك","ايدي خويك او إي ادمن","ايدي خويك الثالث"];
client.on("message", msg =>{
  let args = msg.content.split(" ").slice(1)[0];
  let cmd = msg.content.split(' ')[0]
  if(cmd === `${prefix}giftR`){
  let roleW = msg.mentions.roles.first();
  if(!devs.includes(msg.author.id)){
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - انت لاتمتلك الصلاحية`);
    msg.reply(embed).then( z => z.delete(3000));
     return
  }
  if(!roleW) {
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - منشن الرتبة \`${prefix}giftR <@admin-role>\``);
    msg.reply(embed).then( z => z.delete(3000)); return
  };
  let role = msg.guild.roles.find(`name`, roleW.name);
  if(!role) {
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - Could't find \`${roleW.name}\` role.`);
  msg.reply(embed).then( msgs => msgs.delete(3000));
  return
  }
  var randomkeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var gift = "";
  for (var y = 0; y < 16; y++) {   ///16
    gift +=  `${randomkeys.charAt(Math.floor(Math.random() * randomkeys.length))}`;
  }
  giftKeys[gift] = role;
  let embed = new Discord.RichEmbed()
  .setColor("#42f4f4")
  .setTitle(`:ok_hand: - **تم ارسآل الكود على الخاص**`);
  msg.reply(embed);
  let embed2= new Discord.RichEmbed()
  .setAuthor(msg.author.username, msg.author.displayAvatarURL)
  .setThumbnail(msg.author.avatarURL)
  .addField("**Key Of Gift**", gift,true)
  .addField("Role",giftKeys[gift].name,true)
  .addField("This Key Made by", msg.author, true)
  .addField("The Room", msg.channel , true)
  .setTimestamp()
  .setFooter(client.user.username,client.user.displayAvatarURL)  
  msg.author.send(embed2);
};
if( cmd === `${prefix}used`){
 
  if(!args) {  
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - **الرجاء ادخال كود الهدية** \`${prefix}used <Key>\``)
    msg.reply(embed).then( z => z.delete(3000));
    return
}
let embed = new Discord.RichEmbed()
.setTitle(`**جاري التحقق من الكود**`)
.setColor("#42f4f4")
  msg.reply(embed).then( msgs =>{
  if(giftKeys[args]){
    let hav = msg.member.roles.find(`name`, giftKeys[args].name);
    if(hav){
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **انت تمتلك هذه الرتبة مسبقًا**  \`${giftKeys[args].name}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    return
    }
    let embed = new Discord.RichEmbed()
    .setTitle(`:tada: - **مبروك تم اعطائك رتبة** \`${giftKeys[args].name}\``)
    .setColor("#42f4f4")
    msgs.edit(embed)
    msg.member.addRole(giftKeys[args]);
    delete giftKeys[args]
  }else{
    let embed = new Discord.RichEmbed()
    .setTitle(`:x: - **الكود غير صيحيح أو انه مستعمل من قبل**`)
    .setColor("#42f4f4")
    msgs.edit(embed)
  }});
};
});


















if(message.content.startsWith(prefix + "chatspr")){ //يقفل الشاتات
        message.guild.channels.forEach(c=>{
            let role = message.guild.roles.find(r => r.name === "@everyone");
            c.overwritePermissions(role, {
                READ_MESSAGES: false
            });
        })
    }
    if(message.content.startsWith(prefix + "chatson")){ //يفتح الشاتات
        //الفلتر الموجود يمديك تضيف فيه اسامي الشاتات الي م تبيها تنفتح
        //او تغير !==
        //ل ===
        //وبيصير يفتح الشاتات الي حددتها
        //كل م تبي تضيف شات تسوي
        // && c.name !== "اسم الشات"
        message.guild.channels.filter(c => c.name !== "اسم رقم 1" && c.name !== "اسم رقم 2 يمديك تزيد لو تبي").forEach(c=>{
            let role = message.guild.roles.find(r => r.name === "@everyone");
            c.overwritePermissions(role, {
                READ_MESSAGES: true
            });
        })
    }

	
	
	
	
	
	
	
	
	
	
	client.on('message' , message => {
      if(message.author.bot) return;
     
      if(message.content.startsWith(prefix + "bcrole")) {
        if (!message.member.hasPermission("ADMINISTRATOR"))  return;
        let args = message.content.split(" ").slice(2);
     var codes = args.join(' ')
       
        if(!codes) {
          message.channel.send("قم بكتابة الرسالة | `$rolebc role message`")
            return;
        }
     
     
              var role = message.mentions.roles.first();
                if(!role) {
                  message.reply("لا توجد رتبة بهذا الاسم")
                    return;
                }
            message.guild.members.filter(m => m.roles.get(role.id)).forEach(n => {
              n.send(`${codes}`)
            })
            message.channel.send(`لقد تم ارسال هذه الرسالة الى ${message.guild.members.filter(m => m.roles.get(role.id)).size} عضو`)
        }
    });
	
	
	
	
	
	
	
	
	
	
	client.on('message', message => {
      if(message.content.startsWith ("طلب زواج")) {
      if(!message.channel.guild) return message.reply('**This command only for servers**')
      var proposed = message.mentions.members.first()
     
      if(!message.mentions.members.first()) return message.reply(' +2D3eDw **منشن البنت الي تبغى تزوجها**').catch(console.error);
      if(message.mentions.users.size > 1) return message.reply(' +2D3eMw **تقدر تتجوز بنت وحدة**').catch(console.error);
       if(proposed === message.author) return message.reply(`**.**`);
        if(proposed === client.user) return message.reply(`** هل تريد الزواج من  **`);
              message.channel.send(`**${proposed} 
 Do you accept ${message.author} marry request
 You have 30 sec
 Write نعم or لا**`)

const filter = m => m.content.startsWith("نعم");
message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
.then(collected =>{ 
    message.channel.send(` **${message.author} +Bkg ${proposed} Congratulations, you have got married +2D3ccA +2DzfiQ** `);
})

   const filte = m => m.content.startsWith("لا");
message.channel.awaitMessages(filte, { max: 1, time: 30000, errors: ['time'] })
.then(collected =>{ 
   message.channel.send(`  **${message.author} Unfortunately We wont eat wedding cake this time +2D3eFA** `);
})
        
  }
});
	
	
});

client.login(process.env.BOT_TOKEN);
