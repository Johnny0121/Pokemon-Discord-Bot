const configs = require('../config');
const https = require('https');

function toAbilityString(abilityResponse) {
    var result = `> **ID**: ${abilityResponse.id}\n`;

    result += `> **Generation**: ${abilityResponse.generation.name}\n`;
    result += `> **Effect (short)**: ${abilityResponse.effect_entries.filter(x => x.language.name == 'en')[0].short_effect.replace(/(\r\n|\n|\r)/gm, " ")}\n`;
    result += `> **Effect (long)**: ${abilityResponse.effect_entries.filter(x => x.language.name == 'en')[0].effect.replace(/(\r\n|\n|\r)/gm, " ")}\n`;
    result += `> **Part of main series**: ${abilityResponse.is_main_series}\n`;
    result += `> **Used by**: ${abilityResponse.pokemon.map(x => x.pokemon.name).join(', ')}\n`;

    return result;
}

module.exports = {
    name: 'ability',
    description: 'Responsible for managing commands directed towards the /pokemon ability',
    execute: function (message, args) {
        try {
            if (args.length != 1) {
                return message.channel.send(`${configs.pokemon.api.ability.error}`);
            }

            https.get(`${configs.pokemon.api.base_url}/ability/${args[0]}`, response => {
                let abilityResponse = '';

                response.on('data', chunk => {
                    abilityResponse += chunk;
                });

                response.on('end', () => {
                    message.channel.send(`Here's what I've found about this ability:\n`);
                    message.channel.send(toAbilityString(JSON.parse(abilityResponse)));
                });
            }).on('error', err => {
                console.log(`Error: ${err}`);
                message.channel.send(`${configs.pokemon.api.downtime}`);
            });
        } catch (e) {
            message.channel.send(configs.pokemon.messages.error);
        }
    }
};