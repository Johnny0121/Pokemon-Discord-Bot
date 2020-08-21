const configs = require('../config');
const commandExecuter = require('./main.js');

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
        commandExecuter.execute(message, args, 'ability', configs.pokemon.api.ability.error, toAbilityString);
    }
};