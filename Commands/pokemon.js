const configs = require('../config')

module.exports = {
    name: 'pokemon',
    description: 'Responsible for managing commands directed towards the /pokemon call',
    execute(message, args) {
        try {
            message.channel.send(`Your args: \`${args}\``);
            message.channel.send(`Your message: \`${message}\``);

            if (args == null || args.length <= 0) {
                message.channel.send(configs.pokemon.messages.introduction);
            }
        } catch (e) {
            message.channel.send(configs.pokemon.messages.error);
        }
    }
};