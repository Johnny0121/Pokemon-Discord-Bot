require('dotenv').config();
const Configs = require('./config.js');
const Discord = require('discord.js');
const FileSystem = require('fs');
const client = new Discord.Client();
const CommandList = require('./commands.js');

const COMMAND_PREFIX = '/poke';
client.commands = new Discord.Collection();

const commandFiles = FileSystem.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {COMMAND_PREFIX
    console.log('Pokemon Bot is ready to roll!');
});

client.on('message', message => {
    if (!message.content.toLowerCase().startsWith(COMMAND_PREFIX) || message.author.bot) return;

    const args = message.content.slice(COMMAND_PREFIX.length + 1).split(' ');
    const command = args.shift().toLowerCase();

    console.log({ args, command });

    if (command == null || command.length <= 0) {
        message.channel.send(Configs.pokemon.messages.introduction);
    } else if (client.commands.has(command)) {
        client.commands.get(command).execute(message, args);
    } else {
        message.channel.send(Configs.pokemon.messages.unknown_command);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);