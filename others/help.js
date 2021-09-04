const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);
const db = require('quick.db');

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 1.5,
  description: "",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/832678897434230864/833341017125683200/standard_15.gif`)
    .setColor("#FC00FF")
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
    .setAuthor("Lilaaaa ✨", "https://cdn.discordapp.com/avatars/792047204361175091/c3c061050f56e58aa1f008de8b86dd26.png?size=1024")
    .setDescription(` 
<a:discord:813406342173818910> **| User Commands**
> \`invite . invites . support . about   avatar . ping . prefix . uptime  . vote . se . serverinfo   servericon(icon) . userinfo(user)   emojify . emojiinfo(emoji) . social   membercount(count)\`

 
<a:setting:813404135181385759> **| Moderation Commands**
> \`lock(l) . unlock(ul) . slowmode . ban   bans . unban . createchannel   deletechannel   mute . unmute   giveaway . embed . say . cv\`


<aemoji_2839038769087905793> **| Gif Commands**
> \`boy . girl . baby . smoke\` 


<a:winner:817425780992114708> **| Game Commands**
> \`slap . hug\`


<a:dark:813714900777959444> **| Music Commands**
> \`play . skip . skipto . stop . volume   nowplaying . shuffle . search . resume   remove . queue . filter . loop   lyrics . radio\` 



<a:links:813729922643263558> **| Links**
__**[Support](https://discord.gg/WyaywkSHbC)**__ **-**  __**[Invite](https://discord.com/api/oauth2/authorize?client_id=704397709662224535&permissions=8&scope=bot)**__
`)
   helpEmbed
   message.react("✅")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
