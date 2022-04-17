const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { log } = require("./utils/console.js")
const fs = require('node:fs');
const path = require('node:path');

const { token, guildId, clientId, logsGuildId, logsChannel } = require('./config.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES] });

client.commands = new Collection();

/**
 * @description The Discord bot logger
 * @type {Logger}
 * @param {*} embed The discord embed object
 * @return {void}
 */
 function botLogger(Embed) {
    let guild = client.guilds.cache.get(logsGuildId);
    let channel = guild.channels.cache.get(logsChannel);
    channel.send({ embeds: [Embed] });
};

/**
 * @description Loads the Discord slash commands
 */
function loadSlash() {
    let commandFolder = fs.readdirSync(path.join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
    commandFolder.forEach((file) => {
        try {
            let cmd = require(path.join(__dirname, "commands", file));
            client.commands.set(cmd.data.name, cmd);
            log("green", `Loaded slash command: ${cmd.data.name}.js`);
        } catch (err) {
            console.log(err.toString());
            botLogger(new MessageEmbed()
                .setTitle("Slash Command Error")
                .setDescription(`Unable to load ${file}`)
                .setColor("RED")
            );
        };
    });
}

/**
 * @description Loads the Discord events
 */
function loadEvents() {
    const commandFolder = fs.readdirSync(path.join(__dirname, "events")).filter((file) => file.endsWith(".js"));
    commandFolder.forEach((file) => {
        try {
            let module = require(path.join(__dirname, "events", file))(client);
            log("green", `Loaded event: ${file}`);
        } catch (err) {
            console.log(err.toString());
            botLogger(new MessageEmbed()
                .setTitle("Events Error")
                .setDescription(`Unable to load ${file}`)
                .setColor("RED")
            );
        };
    })
}

client.once('ready', () => {
    log('green', 'Discord Bot Ready.');

    loadSlash();
    loadEvents();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

require("./utils/slash.js").register().then(() => {
    log('green', 'Successfully loaded Slash commands.');
    client.login(token);
});
