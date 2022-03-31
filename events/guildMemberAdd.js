const discord = require("discord.js");

const config = require("../config");

/**
 * @param {discord.Client} client
 */
module.exports = exports = (client) => {
    client.on("guildMemberAdd", (member) => {
        console.log(`${member.user.id} has joined the server!`);
    });
};