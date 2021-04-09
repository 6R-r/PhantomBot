const config = require('../config.json');

class cafeActions {
	static async greetMorningOrNight(client, message) {
		// Handle good morning and goodnight, and hello and goodbye
		if (
			message.content.toLowerCase().indexOf("good") != -1 &&
			message.content.toLowerCase().indexOf("night") != -1 &&
			(
				message.content.toLowerCase().indexOf("qts") != -1 ||
				message.content.toLowerCase().indexOf("gorls") != -1
			)
		) {
			return await message.react(config.emotes.goodnight);
		} else if (
			message.content.toLowerCase().indexOf("good") != -1 &&
			message.content.toLowerCase().indexOf("morning") != -1 &&
			(
				message.content.toLowerCase().indexOf("qts") != -1 ||
				message.content.toLowerCase().indexOf("gorls") != -1
			)
		) {
			return await message.react(config.emotes.goodmorning);
		} else if (
			message.content.toLowerCase().indexOf("hello") != -1 &&
			(
				message.content.toLowerCase().indexOf("qts") != -1 ||
				message.content.toLowerCase().indexOf("gorls") != -1
			)
		) {
			return await message.react(config.emotes.wave);
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