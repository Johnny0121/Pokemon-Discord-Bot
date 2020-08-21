const configs = require('../config');
const commandExecuter = require('./main.js');

function toLocationString(locationResponse) {
    var result = `> **ID**: ${locationResponse.id}\n`;

    result += `> **City Name**: ${locationResponse.name}\n`;
    result += `> **Names**: ${locationResponse.names.map(x => `${x.name} (${x.language.name})`)}\n`;
    result += `> **Region**: ${locationResponse.region.name}\n`;
    result += `> **Areas**: ${locationResponse.areas.map(x => x.name)}\n`;

    return result;
}

module.exports = {
    name: 'location',
    description: 'Responsible for managing commands directed towards the /pokemon call',
    execute(message, args) {
        commandExecuter.execute(message, args, 'location', configs.pokemon.api.location.error, toLocationString);
    }
};