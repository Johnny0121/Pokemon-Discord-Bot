const configs = require('../config');
const commandExecuter = require('./main.js');
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
    result += `> **Height**: ${pokemonResponse.height} metres\n`;
    result += `> **Weight**: ${pokemonResponse.weight} kg\n`;

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
        commandExecuter.execute(message, args, 'pokemon', configs.pokemon.api.pokemon.error, toPokemonString);
    }
};