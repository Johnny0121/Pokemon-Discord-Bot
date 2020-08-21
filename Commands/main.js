const configs = require('../config');
const https = require('https');
const stringHelper = require('../Helpers/stringHelper.js');

const execute = function (message, args, endpoint, apiErrorMessage, responseAdaptor) {
    try {
        if (args.length != 1) {
            message.channel.send(`${apiErrorMessage}`);
            return;
        }

        https.get(`${configs.pokemon.api.base_url}/${endpoint}/${args[0]}`, response => {
            let pokemonResponse = '';

            response.on('data', chunk => {
                pokemonResponse += chunk;
            });

            response.on('end', () => {
                if (stringHelper.isValidJson(pokemonResponse)) {
                    message.channel.send(`Here's what I've found about this Pokemon:\n`);
                    message.channel.send(responseAdaptor(JSON.parse(pokemonResponse)));
                } else {
                    message.channel.send(`${apiErrorMessage}`);
                }
            });
        }).on('error', err => {
            message.channel.send(`${configs.pokemon.api.downtime}`);
        });
    } catch (e) {
        message.channel.send(configs.pokemon.messages.error);
    }
}

module.exports = {
    execute: execute
};