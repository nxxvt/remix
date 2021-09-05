const Discord = module.require("discord.js");

module.exports = {
   name: "unlock",
   aliases: ["ul"],
   description: "Unlocks a Channel",
   async execute(message, args) {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("You don't have enough Permissions")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        null : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("")
   .setTimestamp()
   .setThumbnail(message.author.avatarURL({dynamic: "true"}))
   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setDescription(`
<a:security:884038356558839818> | Unlocked Channel
Channel Name : <#${message.channel.id}>
Locked By : <@${message.author.id}>
Channel Status : Send Message <a:emoji_13:884054704999530546> 
`)
   .setColor("#FC00FF");
   await message.channel.send(embed);
}
}
