const Discord = require('discord.js');
const table = require('easy-table');

module.exports = {
  run: async (client, message, args) => {
    try {
      if (!args[0]) { return message.reply('Please enter an ammunition type name.'); }

      const ammoList = require(__basedir + '/config/ammo.json');
      const ammo = ammoList[args[0]];

      if (!ammo) { return message.reply('Couldn\'t find an ammo type with that name.'); }

      const embed = new Discord.MessageEmbed().
        setTitle(`Ammo - ${args[0]}`).
        setColor(5517157).
        setTimestamp();

      const ammoTable = new table;
      ammo.ammoTypes.forEach(ammoType => {
        ammoTable.cell('Name', ammoType.name);
        ammoTable.cell('Damage', ammoType.damage);
        ammoTable.cell('Penetration', ammoType.armourPen);
        ammoTable.newRow();
      });

      embed.setDescription(`Compatible with ${ammo.weapons.join(', ')}:\n\`\`\`${ammoTable}\`\`\``);

      message.channel.send(embed);

    } catch (err) {
      throw new Error(err);
    }
  },

  help: 'Show information about the specified ammo type.'
};