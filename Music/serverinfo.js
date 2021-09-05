const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);
const db = require('quick.db');

module.exports = {
  name: "serverinfo",
  aliases: ["server"],
  cooldown: 5,
  description: "",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setColor("#FC00FF")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setAuthor(`${message.guild.name}`,message.guild.iconURL({ dynamic: true }))
    .addField('<a:crown:884093049452527666> Owner Server :',`<@${message.guild.ownerID}>`,true)
    .addField('<a:time:884045404684050443> Created On :',message.guild.createdAt.toLocaleString())
    .addField('🆔 Server ID :',`\`${message.guild.id}\``,true)
    .addField('<a:dis:884040257274802236> Members :',`\`${message.guild.memberCount}\``,true)
    .addField('<a:star3:884091781178855535> Channels :',`\`${message.guild.channels.cache.size}\``,true)
    .addField('<a:earth:884092052432900126> Region :',`\`${message.guild.region}\``,true)
    .addField('<a:marker:884093483105792020> Roles :', `\`${message.guild.roles.cache.size}\``, true)
    .addField('<a:boost:884090679473627217> Total Boost :',`\`${message.guild.premiumSubscriptionCount} Boost\``,true)
    .addField('<a:work:884093888829218886> Emojis :',`\`${message.guild.emojis.cache.size}\``,true)
   helpEmbed
   message.react("✅")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
