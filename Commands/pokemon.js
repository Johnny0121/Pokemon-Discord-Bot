const configs = require('../config');
const https = require('https');
const stringHelper = require('../Helpers/stringHelper.js');

function toPokemonString(pokemonResponse) {
    var result = `> **ID**: ${pokemonResponse.id}\n`;

    result += `> **Name**: ${pokemonResponse.name}\n`;
    result += `> **Abilities**: ${pokemonResponse.abilities.map(x => x.ability.name).join(', ')}\n`;
    result += `> **Moves**: ${pokemonResponse.moves.map(x => x.move.name).join(', ')}\n`;
    result += `> **Forms**: ${pokemonResponse.forms.map(x => x.name).join(', ')}\n`;
    result += `> **Types**: ${pokemonResponse.types.map(x => x.type.name).join(', ')}\n`;
    result += `> **Species**: ${pokemonResponse.species.name}\n`;
    result += `> **Species**: ${pokemonResponse.species.name}\n`;
    result += `> **Height**: ${pokemonResponse.height} Metres\n`;
    result += `> **Weight**: ${pokemonResponse.weight} Kg\n`;

    var stats = pokemonResponse.stats.map(x => ({
        name: x.stat.name,
        base_stat: x.base_stat,
        effort: x.effort
    }));

    for (var stat of stats) {
        result += `> **${stringHelper.toPascalCase(stat.name)}**: ${stat.base_stat}\n`;
    }

    return result;
}

module.exports = {
    name: 'pokemon',
    description: 'Responsible for managing commands directed towards the /pokemon call',
    execute(message, args) {
        try {
            if (args.length != 1) {
                message.channel.send(`${configs.pokemon.api.pokemon.error}`);
                return;
            }

            https.get(`${configs.pokemon.api.base_url}/pokemon/${args[0]}`, response => {
                let pokemonResponse = '';

                response.on('data', chunk => {
                    pokemonResponse += chunk;
                });

                response.on('end', () => {
                    message.channel.send(`Here's what I've found about this Pokemon:\n`);
                    message.channel.send(toPokemonString(JSON.parse(pokemonResponse)));
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