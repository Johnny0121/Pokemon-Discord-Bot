var config = {
	pokemon: {
		messages: {
			introduction: "Hello, this is Poke Bot! To get started, call \`/pokemon help\` for a list of commands you can try out!",
			error: `Oh no. Something went wrong! If you need help with commands, call \`/pokemon help\``,
			unknown_command: `Hi, I don't think that command is going to work for you. Try a different one or call \`/pokemon help\` for a list of commands!`
		},
		api: {
			base_url: 'https://pokeapi.co/api/v2',
			pokemon: {
				error: 'Hi, that call for a pokemon\'s data doesn\'t look right. Try following this format \`/poke pokemon [Name or ID of Pokemon]\`.'
			},
			ability: {
				error: 'Hi, that call for a pokemon\'s data doesn\'t look right. Try following this format \`/poke ability [Name or ID of ability]\`.'
            },
			downtime: 'Oh no! It looks like Pokebot is unable to retrieve the data from the backend service. Try again at a later time.'
        }
	}
};

module.exports = config;