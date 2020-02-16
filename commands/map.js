const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
  try {
    if (!args[0]) { return message.reply('Please enter a map name.'); }

    const maps = require(__basedir + '/config/maps.json');
    const map = maps[args[0]];
    
    if (!map) { return message.reply(`Couldn't find a map with that name.`); }

    const embed = new Discord.MessageEmbed().
      setTitle(args[0]).
      setColor(5517157).
      setDescription(`Timer: ${map.timer} minutes.\n${map.description}`).
      setImage(map.banner);

    for (const area in map.maps) {
      embed.addField(area, map.maps[area]);
    }
    
    message.channel.send(embed);
  } catch (err) {
      throw new Error(err);
    }
  },

  help: 'Show information for the specified map.'
};