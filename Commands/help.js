const configs = require('../config');

module.exports = {
    name: 'help',
    description: 'Lists information about available commands that can be called.',
    execute(message, args) {
        try {
            message.channel.send('Haha, no help 4 u');
        } catch (e) {
            message.channel.send(configs.pokemon.messages.error);
        }
    }
};