const { MessageEmbed } = require('discord.js');
const { BOT_OWNER_ID,BOT_ID,SERVER_INVITE,EMOJI_DONE,EMOJI_ERROR} = require("../config.json");
module.exports = {
    name: "userinfo",
    aliases: ["user", "u", "U"],
    cooldown: 5,
    category: "extra",
    async execute(message, args) {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let status;
        switch (user.presence.status) {
            case "online":
                status = "<:online:729181184193462285> online";
                break;
            case "dnd":
                status = "<:dnd:729181212530442311> dnd";
                break;
            case "idle":
                status = "<:idle:729181121933475931> idle";
                break;
            case "offline":
                status = "<:offline:729181162182017051> offline";
                break;
        }

        const embed = new MessageEmbed()
            .setTitle(`${user.user.username}`)
            .setColor(`#FC00FF`)
            .setTimestamp()
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "<a:star2:884088337705603112> User Name : ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "<a:star:884087313074905089> Discriminator: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name:  "<a:load:884088687917404210> User ID : ",
                    value: user.user.id,
                },
                
                {
                    name: "<a:notfication:884089158170206258> Activity : ",
                    value: user.presence.activities[0] ? user.presence.activities[0].name : `User isn't playing a game!`,
                    inline: true
                },
                {
                    name: '<a:link:884039220564471858> Avatar link : ',
                    value: `[Click Here](${user.user.displayAvatarURL()})`
                },
                {
                    name: '<a:time:884045404684050443> Creation Date : ',
                    value: user.user.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: '<a:dis:884040257274802236> Joined Date : ',
                    value: user.joinedAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: '<a:king:884086609643995146> User Roles : ',
                    value: user.roles.cache.map(role => role.toString()).join(" ,"),
                    inline: true
                }
            )

        await message.channel.send(embed)
    }
}
