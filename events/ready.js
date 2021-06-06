const config = require('../config.json')
const Discord = require('discord.js')

const createCommands = require('../utils/slashcommands')

// Get the tables stored in the MongoDB database
const Afks = require('../databaseFiles/connect.js').Afks
const Prefixes = require('../databaseFiles/connect').Prefixes;

module.exports = async (client) => {
	createCommands.create(client)

	client.ws.on('INTERACTION_CREATE', async (interaction) => {
		const { name, options } = interaction.data

		const command = name.toLowerCase()

		const args = {}

		if (options) {
			for (const option of options) {
				const { name, value } = option
				args[name] = value
			}
		}

		const sender = interaction.member.user

		if (command === 'hello') {
			reply(interaction, 'Hello there!')
		} else if (command === 'afk') {
			var afkMessage

			if (args['note']) {
				afkMessage = args['note']
			} else {
				afkMessage = "They didn't tell us where they went..."
			}

			let result = await Afks.findOne({ user: sender.id })

			if (result === null) {
				afkObject = {
					message: afkMessage,
					user: sender.id,
					cooldown: Date.now(),
					date: Date.now()
				}

				await Afks.insertOne(afkObject)

				try {
					reply(interaction, `I have marked you as AFK, <@${sender.id}>. Anyone who pings you will be notified you are away.\n\`\`\`AFK Message: ${afkMessage}\`\`\``)
				} catch (err) {
					console.log(err)
				}
			} else {
				await Afks.deleteOne({user: sender.id})

				try {
					reply(
						interaction,
						`Welcome back, ${sender.nickname ? sender.nickname : sender.username}!`
					)
				} catch(err) {
					console.error(err)
				}
			}
		} else if (command === 'botinfo') {
			const version = config.version
			const versioninfo = config.versioninfo

			let infoMessage = new Discord.MessageEmbed()
				.setColor(config.colors.embedColor)
				.setTitle('Phantom')
				.setThumbnail(
					'https://cdn.discordapp.com/attachments/326804095073779712/829028266017816576/phantom.png'
				)
				.addField(
					'Description',
					'A fun and helpful custom bot made specifically for the Zeldacord.'
				)
				.addField('Version', version)
				.addField('Version Info', versioninfo)
				.addField(
					'GitHub',
					'Want to help me develop PhantomBot? Check out the repo on GitHub! https://github.com/zmontgo/PhantomBot'
				)

			reply(
				interaction,
  			infoMessage
			)
		} else if (command === 'choose') {
			choiceargs = args['choices'].split(/,+ */)

			if (choiceargs.includes('')) {
				return await message.channel.send('Choices cannot be empty!')
			}
	
			const choiceIndex = Math.floor(Math.random() * choiceargs.length)
			reply(
				interaction,
				'I choose **' + choiceargs[choiceIndex] + '**!'
			)
		} else if (command === 'coffee') {
			reply (
				interaction,
				Math.random() < 0.5 ? ':coffee:' : ':coffin:'
  		);
		} else if (command === 'feedback') {
			let feedbackMessage = new Discord.MessageEmbed()
				.setColor(config.colors.embedColor)
				.setTitle('Leave Feedback')
				.setDescription(
					`Take this three-question form to help us improve the bot: https://docs.google.com/forms/d/e/1FAIpQLSetAjKp-J9wPpLecN7jFCsacxEZaNjc7OA_PiylMQXoMHPazA/viewform`
				)

			reply(
				interaction,
				feedbackMessage
			)
		} else if (command === 'hug') {
			if (args['user']) {
				reply(
					interaction,
					`_Hugs <@${args['user']}>._\nDon't worry, it'll be alright.`
				)
			} else {
				reply(
					interaction,
					`_Hugs <@${sender.id}>._\nDon't worry, it'll be alright.`
				);
			}
		} else if (command === 'jail') {
			if (args['user']) {
				reply(
					interaction,
					`_Puts <@${args['user']}> in jail._`
				)
			} else {
				reply(
					interaction,
					`_Puts <@${sender.id}> in jail._`
				);
			}
		} else if (command === 'shoot') {
			function getRandomInt(max) {
				return Math.floor(Math.random() * Math.floor(max))
			}
		
			if (getRandomInt(100) == 99) {
				let shootReply

				if (typeof args['user'] !== 'undefined') shootReply = `_Shoots <@${args['user']}> violently._\nYou're now in jail. Take some time to consider what brought your life to this point.`
				else shootReply = `_Shoots randomly into the air._\nTurns out there was a gang boss behind you who passed out from fear and was promptly arrested. Congratulations, you saved the city. Also, you went to jail for tax evasion.`
				
				reply(interaction, shootReply)
			} else {
				reply(
					interaction,
					`Violence is never the answer. Do... you need a \`/hug\`?`
				);
			}
		} else if (command === 'summon') {
			if (args['user']) {
				reply(
					interaction,
					`_:candle: <@${sender.id}> summons <@${args['user']}>. :candle:_`
				)
			} else {
				reply(
					interaction,
					`_:candle: <@${sender.id}> summons a genie. :candle:_`
				);
			}
		} else if (command === 'tea') {
			reply (
				interaction,
				Math.random() < 0.5 ? ':tea:' : ':deciduous_tree:'
  		);
		}
	})

	const reply = async (interaction, response) => {
		let data = {
			content: response
		}

		if (typeof response === 'object') {
			data = await createAPIMessage(interaction, response)
		}

		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data,
			},
		})
	}

	const createAPIMessage = async (interaction, content) => {
		const { data, files } = await Discord.APIMessage.create(
			client.channels.resolve(interaction.channel_id),
			content
		)
			.resolveData()
			.resolveFiles()

		return { ...data, files }
	}

	console.log(`Running on ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers.`)
	client.user.setActivity(config.playing)
}
