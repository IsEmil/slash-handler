const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, guildId, clientId, globalSlash } = require('../config.js');
const { log } = require('./console.js');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

function loadSlash() {
    let commandFolder = fs.readdirSync(path.join(__dirname, "/../commands")).filter((file) => file.endsWith(".js"));
    commandFolder.forEach((file) => {
        try {
            let cmd = require(path.join(__dirname, "/../commands", file));
            commands.push(cmd.data.toJSON());
        } catch (err) {
            console.log(err.toString());
        };
    });
}

// Load CMDS
loadSlash();

module.exports = {
    register: async () => {
        const rest = new REST({ version: '9' }).setToken(token);

        try {
            log('yellow', 'Started refreshing application (/) commands.');

            if (globalSlash) {
                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: commands },
                );
                log('green', 'Global application (/) commands.');
            } else {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                );
                log('green', 'Guild application (/) commands.');
            }

            log('green', 'Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    },
}