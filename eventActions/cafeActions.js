const config = require('../config.json');

class cafeActions {
	static async greetMorningOrNight(client, message) {
		// Handle good morning and goodnight, and hello and goodbye
		var emotions = ['<:ZeldAYAYA:619816788414431232>','<a:ZeldaYay:697396115082838167>','<a:ZeldaTwirl:697396089715818546>','<:Zelduwu:562667938289680399>','<:ZeldaHeart:650247233006206976>','<:ZeldaHeadpats:717228153596018698>','<:ToonZeldaHappy:562667543307878402>','<:PillowZelda:562667410738511872>','<a:HeartSparkle:598282264228397087>','<:HeartContainer:562667186670272523>']
		var choice = emotions[Math.floor((Math.random() * emotions.length))];
		if (
			message.content.toLowerCase().indexOf("good") != -1 &&
			message.content.toLowerCase().indexOf("night") != -1 &&
			message.content.toLowerCase().indexOf("gorls") != -1
		) {
			await message.react(config.emotes.goodnight);
			return await message.channel.send(`Goodnight <@${message.author.id}>! ${choice}`);
		} else if (
			message.content.toLowerCase().indexOf("good") != -1 &&
			message.content.toLowerCase().indexOf("morning") != -1 &&
			message.content.toLowerCase().indexOf("gorls") != -1
		) {
			await message.react(config.emotes.goodmorning);
			return await message.channel.send(`Good morning <@${message.author.id}>! ${choice}`);
		} else if (
			message.content.toLowerCase().indexOf("hello") != -1 &&
			message.content.toLowerCase().indexOf("gorls") != -1
		) {
			await message.react(config.emotes.wave);
			return await message.channel.send(`Hello <@${message.author.id}>! ${choice}`);
		}
	}

	static async holidayReacts(client, message) {
		/* Handle merry Christmas
		if (
			(message.content.toLowerCase().indexOf("merry") != -1 &&
			message.content.toLowerCase().indexOf("christmas") != -1) ||
			(message.content.toLowerCase().indexOf("happy") != -1 &&
			message.content.toLowerCase().indexOf("holidays") != -1)
		) {
			var reactions = ['🎄', '☃️', '❄️'];
			var choice = reactions[Math.floor(Math.random() * reactions.length)];
			return await message.react(choice);
		}

		// Handle happy new year
		else if (
			message.content.toLowerCase().indexOf("happy") != -1 &&
			message.content.toLowerCase().indexOf("new") != -1 &&
			message.content.toLowerCase().indexOf("year") != -1
		) {
			var reactions = ['🎉', '🎊'];
			var choice = reactions[Math.floor(Math.random() * reactions.length)];
			console.log(choice);
			return await message.react(choice);
		}*/
	}
}

module.exports = cafeActions;