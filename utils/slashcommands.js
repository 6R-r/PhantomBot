var guildId = '791366170611679272'

module.exports.create = async function create (client) {
  const getApp = (guildId) => {
		const app = client.api.applications(client.user.id)
		if (guildId) {
			app.guilds(guildId)
		}
		return app
	}

	await getApp(guildId).commands.post({
		data: {
			name: 'hello',
			description: 'Says hello. Use to test if bot is online.'
		},
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'afk',
			description: 'I will mark you as being away. When people tag you, they will be notified that you are not present.',
			options: [
				{
					name: 'note',
					description: 'Will be included in the message when people tag you.',
					required: false,
					type: 3
				}
			]
		}
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'botinfo',
			description: 'Learn more about Phantom.'
		},
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'choose',
			description: 'I will choose one of your options at random.',
      options: [
				{
					name: 'choices',
					description: 'A list of options seperated by commas. (e.g. option1, option2, ..., optionX)',
					required: true,
					type: 3
				}
			]
		},
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'coffee',
			description: 'I will choose either ☕ or ⚰️. (My version of Russian Roulette)'
		},
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'feedback',
			description: 'Links to a very short Google Form to help us improve the bot.'
		},
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'hug',
			description: 'Hugs you, or a user if one is specified.',
			options: [
				{
					name: 'user',
					description: 'Choose a user to hug.',
					required: false,
					type: 6
				}
			]
		},
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'jail',
			description: 'Jails a specified user.',
			options: [
				{
					name: 'user',
					description: 'Choose a user to jail.',
					required: false,
					type: 6
				}
			]
		},
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'shoot',
			description: 'Shoots a specified user.',
			options: [
				{
					name: 'user',
					description: 'Choose a user to shoot.',
					required: false,
					type: 6
				}
			]
		},
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'summon',
			description: 'Summons a specified user.',
			options: [
				{
					name: 'user',
					description: 'Choose a user to summon.',
					required: false,
					type: 6
				}
			]
		},
	})

	await getApp(guildId).commands.post({
		data: {
			name: 'tea',
			description: 'I will choose either 🍵 or 🌳. (Tea-drinker\'s version of the coffee command)'
		},
	})
}