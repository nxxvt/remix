const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed,MessageAttachment } = require(`discord.js`);
const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const db = require('quick.db');
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`./config.json`);
const figlet = require("figlet");
const client = new Client({ disableMentions: `` , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login('NzA0Mzk3NzA5NjYyMjI0NTM1.XqcjfQ.uvoREXx1WgbOqVaFyD58RNhtddg');
client.commands = new Collection();
client.setMaxListeners(0);    
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

//this fires when the BOT STARTS DO NOT TOUCH
client.on(`ready`, () => {	
//////////////

////////
   
   ///////////////////////////////
    ////////////IFCHEMPTY//////////
        //remove everything in between those 2 big comments if you want to disable that the bot leaves when ch. or queue gets empty!
        setInterval(() => {  
          let member;
        client.guilds.cache.forEach(async guild =>{
        await delay(15);
          member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
        //if not connected
          if(!member.voice.channel)
          return;
        //if alone 
        if (member.voice.channel.members.size === 1) 
        { return member.voice.channel.leave(); } 
      });
      
   
     client.user.setActivity(`${PREFIX}help | ${process.version}`, { type: "LISTENING"});   
           
           
     client.user.setActivity(`${client.guilds.cache.size} | Servers`, { type: "LISTENING"});
           
           
      }, (5000));    
      ////////////////////////////////
      ////////////////////////////////
    figlet.text(`${client.user.username} ready!`, function (err, data) {
      if (err) {
          console.log('Something went wrong');
          console.dir(err);
      }
      console.log(`???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????`);
      console.log(data)
      console.log(`???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????`);
    })
   
});
//DO NOT TOUCH
//FOLDERS:
//Admin custommsg data FUN General Music NSFW others
commandFiles = readdirSync(join(__dirname, `Music`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Music`, `${file}`));
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `others`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `others`, `${file}`));
  client.commands.set(command.name, command);
}
//COMMANDS //DO NOT TOUCH
client.on(`message`, async (message) => {
  if (message.author.bot) return;
  
  //getting prefix 
  let prefix = await db.get(`prefix_${message.guild.id}`)
  //if not prefix set it to standard prefix in the config.json file
  if(prefix === null) prefix = PREFIX;

  //information message when the bot has been tagged
  if(message.content.includes(client.user.id)) {
    message.reply(new Discord.MessageEmbed()
                  .setColor("#FC00FF")
                  .setDescription(` 
Support Server - [Click Me](https://discord.gg/WyaywkSHbC)
Bot Link - [Click Me](https://discord.com/api/oauth2/authorize?client_id=704397709662224535&permissions=8&scope=bot)
`) 
                  .setTitle(`
Join a voice channel and \`>play\` a song.
Type \`>help\` for the list of commands.`));
    
} 
   
   //An embed announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}embed`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FC00FF")
    .setDescription(saymsg)
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  }
   
//An cv announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}cv`)){
    //define saymsg
     if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.guild.name}`,message.guild.iconURL({ dynamic: true }))
    .setDescription(saymsg)
    .setTimestamp()
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  }   
   
if(message.content.startsWith(`${prefix}vote`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
     message.react("<a:setting:813404135181385759>").catch(console.error);
    const embed = new Discord.MessageEmbed()
    .setDescription("<a:rast:813403866472251399> **[Click here](https://top.gg/bot/792047204361175091/vote) to vote the bot.**")
    .setColor("#FC00FF")
    //send the Message
    message.author.send(embed)
  } 
   
//An suuport announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}social`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FC00FF")
    .setDescription (`
<:fb:884096880630464543> ** : [Facebook](https://www.facebook.com/anas.dler.14)**
<:sc:884097302308978709> ** : [Snap](https://www.snapchat.com/add/mr_wizo2020)**
`)
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor(`??????? Social Media`)
    .setThumbnail(`https://cdn.discordapp.com/attachments/818536754775851009/831880061505634354/05-33-08-831704821367177247.png`)
    
    //send the Message
    message.channel.send(embed)
  }
   
//An suuport announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}support`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FC00FF")
    .setDescription (`

<a:dasarast:884042158821244928> **[Invite](https://discord.com/api/oauth2/authorize?client_id=704397709662224535&permissions=8&scope=bot)**
   
<a:dasarast:884042158821244928> **[Support](https://discord.gg/WyaywkSHbC)**
 

`)
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor(`Support Lilaaaa ???`, `https://cdn.discordapp.com/avatars/792047204361175091/c3c061050f56e58aa1f008de8b86dd26.png?size=2048`)
    .setImage(`https://cdn.discordapp.com/attachments/795388713659269150/820761124310876160/23-51-29-image0-40.gif`)
    
    //send the Message
    message.channel.send(embed)
  }
   
//An about announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}about`)){
    //define saymsg
    message.react("<a:emoji_83:779961659631730689>").catch(console.error);
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FC00FF")
    .setAuthor("Lilaaaa ???", "https://cdn.discordapp.com/avatars/792047204361175091/c3c061050f56e58aa1f008de8b86dd26.png?size=2048")
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`
**[Lilaaaa ??? Stats](https://discord.com/api/oauth2/authorize?client_id=704397709662224535&permissions=8&scope=bot)**
Hey My name is **Lilaaaa ???** and My Work is to play Music
**<a:star2:884088337705603112> Owner Bot :**
<@603886576279224340>

**<a:star:884087313074905089> Name Bot :**
Lilaaaa ???#9054 

**<a:anime:884039683997319209> Prefix Bot :**
${prefix}

**<a:work:884093888829218886> Job Bot :**
All Command

**<a:earth:884092052432900126> Server :** 
${client.guilds.cache.size}

**<a:waiting:884044243176411206> Ping :**
${client.ws.ping}

**<a:emoji_28:884108281365299220> Version :**
V2
`)

    //send the Message
    message.channel.send(embed)
  }  

//command Handler DO NOT TOUCH
 const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
 if (!prefixRegex.test(message.content)) return;
 const [, matchedPrefix] = message.content.match(prefixRegex);
 const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
 const commandName = args.shift().toLowerCase();
 const command =
   client.commands.get(commandName) ||
   client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
 if (!command) return;
 if (!cooldowns.has(command.name)) {
   cooldowns.set(command.name, new Collection());
 }
 const now = Date.now();
 const timestamps = cooldowns.get(command.name);
 const cooldownAmount = (command.cooldown || 1) * 1000;
 if (timestamps.has(message.author.id)) {
   const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   if (now < expirationTime) {
     const timeLeft = (expirationTime - now) / 1000;
     return message.reply(
      new MessageEmbed().setColor("#FC00FF")
      .setTitle(`<a:halaya:813455108577689601> Please wait \`${timeLeft.toFixed(1)} seconds\` before reusing the \`${prefix}${command.name}\``)    
     );
   }
 }
 timestamps.set(message.author.id, now);
 setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 try {
   command.execute(message, args, client);
 } catch (error) {
   console.error(error);
   message.reply( new MessageEmbed().setColor("#FC00FF")
   .setTitle(`<a:halaya:813455108577689601> There was an error executing that command.`)).catch(console.error);
 }


});

client.on("guildCreate", guild => {
  let channel = client.channels.cache.get("883092199531769897");
  let embed = new MessageEmbed().setColor("#FC00FF")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `??? Join Server`)
  .setTimestamp()
  .addField("???? **Server Name**", `${guild.name}`)
  .addField("???? **Server Owner**", `<@${guild.ownerID}>`,true)
  .addField("???? **Server Id**", `${guild.id}`)
  .addField("???? **Member Count**", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

client.on("guildDelete", guild => {
  let channel = client.channels.cache.get("883092571230986283");
  let embed = new MessageEmbed()
  .setColor("#FC00FF")
  .setTimestamp()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `??? Left Server`)
  .addField("???? **Server Name**", `${guild.name}`)
  .addField("???? **Server Owner**", `<@${guild.ownerID}>`,true)
  .addField("???? **Server Id**", `${guild.id}`)
  .addField("???? **Member Count**", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "boy")) {
    let man = [
      "https://media.discordapp.net/attachments/786897044483604490/803870769313480714/Enes_Acar_GIF_70.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870793716858880/a_57a7f6c875e3a329b170edf177392911.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870817351368734/5-2.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804007829010513966/image1.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804007829483552838/image3.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804219672513478706/Lenora_36.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804220384899498064/Lenora_28.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804220394697392158/Lenora_33.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804315371271749662/image0-20.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804968359572930580/ALANIS_MAN_GIF_156.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804968381816111124/image0-5.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804760463044640808/ALANIS_MAN_GIF_99.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870704999202836/ENES_ACAR_GIF_104.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870737941135421/ENES_ACAR_GIF_15.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638427970568202/Kapson_ckaran_airpods.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638427698855966/15.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638428751233075/image0-2.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638429221388318/a_0adc0e2c6daeef0758ddc31b736ff74e.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638428306898975/DelightfulThreadbareCarp-max-1mb.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870682479067166/ENES_ACAR_GIF_135.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Boy**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FC00FF`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "girl")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711473652563968/830788035221782558/1-28.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830789683994820608/a_f173b0560e24959c0ac615948fff0428.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830788112267345920/1-29.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830788165534220308/1-30.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830791687264796682/1-7.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830791908049158154/gif-18.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830787973166399539/1-36.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830788023028547614/1-27.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830791979281022986/kjhgfghjkl.gif",
      "https://media.discordapp.net/attachments/694695166895849562/797086937068077106/20210106_210640.gif",
      "https://media.discordapp.net/attachments/687763784902770691/802939838793908244/a_b4686f704471be16d09d1cc6506cb4ce.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/818633362616614912/image2.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800849143341514772/a_16743dfad984f574da0b7bc2f9a0b07f.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800850948078698566/000_1-2.gif",
      "https://cdn.discordapp.com/attachments/820811352087330828/820954968793284658/image0.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Girl**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FC00FF`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "smoke")) {
    let man = [
      "https://cdn.discordapp.com/attachments/755893014915711047/829996822042902548/baby_lorenzo___Tumblr.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/830019629137133638/a_bf2b256a73738ec077e555cd129a636b.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/831784931843637248/a_1a06feef2d97c2e9f563f2a8a7f65ddd.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/831784932623515648/20210305_082905.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/831784932387848192/a_f3d97c3e3acc18fc7aa2a4b9658da821.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829989116800008222/image0.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829996732443656232/Smoking_Gif.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829996773028003870/Animated_GIF.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829996813489537074/KURALSIZ.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829996798847614996/Soguk_Nefes-2.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829594717859348480/20.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829725183086034954/mirakaanman_97.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829725196289703967/m2.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829842259709132830/ContaAbimiz_228.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829842189344309308/ContaAbimiz_71.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829244439310106664/Nikolaj_Coster-Waldau_Gif_Hunt.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Smoke**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FC00FF`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "baby")) {
    let man = [
      "https://cdn.discordapp.com/attachments/699339066029768796/831815920594714644/750687987473317938.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831875803179909160/1.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831890205606412398/10.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811050013458462/7.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811061388804106/2.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811054383530044/9.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811092908605440/3.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811102915428362/8.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722126615642172/image4.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722126872150046/image4_1.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722157498826812/image6.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722157749960704/tenor-2.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722158413316096/Zezeee.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722091904106546/baby_9.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722125122469898/image0-4.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722125618315324/image0.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722125953335296/image0_4-1.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722126364246037/image2.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Baby**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FC00FF`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

////////////
client.on("message", message => {
  if (message.content.startsWith(PREFIX + "anime")) {
    let man = [
      "https://media.discordapp.net/attachments/737803741037854750/791307689174368266/image0.gif",
      "https://media.discordapp.net/attachments/737803741037854750/780513385094840400/image1.gif",
      "https://media.discordapp.net/attachments/608711485849337856/859787090652823572/image0.gif",
      "https://media.discordapp.net/attachments/694694884459937862/795704994661531648/image0_7.gif",
      "https://media.discordapp.net/attachments/608711485849337856/832556613172723762/AdelsaAnimeGif-5.gif",
      "https://media.discordapp.net/attachments/737803741037854750/771174875158282270/84091b4211185071ccdbfd093dc42c3c.gif",
      "https://images-ext-1.discordapp.net/external/-wnV7bpoGPShn6cOJB_-nFvQRVnXaeBVizDh2Bewl2w/https/media.discordapp.net/attachments/697505578972348436/868274915793588274/a_c569f2e1f52ff6c4c2f809e218ac1595.gif",
      "https://media.discordapp.net/attachments/608711485849337856/832962704591421450/Feenx_Gif_4.gif",
      "https://images-ext-2.discordapp.net/external/Rqa-Q7QJN-42F2PuORFj7ELNr3ugjYwSjWWBpQ8Nhfc/https/media.discordapp.net/attachments/697505578972348436/868441061306019891/a_ecedb7fb0563d0fc4974ec026bbea1c3.gif",
      "https://images-ext-2.discordapp.net/external/MxI5h2A_1HXy1Q0Xgp4QqUCG2pYgX8-qBqVw-bNdBp8/https/media.discordapp.net/attachments/697505578972348436/866578383671787580/a_40cdd78e4f203eff7f9ac421a617690f.gif",
      "https://media.discordapp.net/attachments/737803741037854750/791307773039214652/image0.gif",
      "https://media.discordapp.net/attachments/694694884459937862/799508744656257024/image0-4.gif",
      "https://images-ext-1.discordapp.net/external/4UAt2-7vYymmgMT3EkbgP3GocsfreNbQCCQZJdky2Go/https/media.discordapp.net/attachments/697505578972348436/866420345221021706/BaranGif.45.gif",
      "https://images-ext-1.discordapp.net/external/_LjqQcVO94pHvrk39v03I0U_F5aXo1GK9v3cxa1os5o/https/media.discordapp.net/attachments/608711485849337856/859895719111294976/a_b7011decdd1c826e543925c2e6390ee8.gif",
      "https://media.discordapp.net/attachments/694694884459937862/797094656122683412/a_80133297a8a819f10e44ad8e95a5ff81.gif",
      "https://media.discordapp.net/attachments/608711485849337856/833291879184597042/x.gif",
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Anime**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FC00FF`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});
/////////
function delay(delayInms) {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve(2);
   }, delayInms);
 });
}


//Bot coded by DarkMan#2021
