require('dotenv').config();
const Discord = require('discord.js');
const FileSystem = require('fs');
const client = new Discord.Client();
const CommandList = require('./commands.js');

const COMMAND_PREFIX = '/'
client.commands = new Discord.Collection();

const commandFiles = FileSystem.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Pokemon Bot is ready to roll!');
});

client.on('message', message => {
    if (!message.content.toLowerCase().startsWith(COMMAND_PREFIX) || message.author.bot) {
        return;
    }

    const args = message.content.slice(COMMAND_PREFIX.length).split(' ');
    const command = args.shift().toLowerCase();

    if (CommandList.commands.Pokemon.includes(command)) {
        client.commands.get('pokemon').execute(message, args);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);