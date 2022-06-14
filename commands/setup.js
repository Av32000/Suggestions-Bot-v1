const { MessageEmbed } = require('discord.js')
const JSON = require('jsonfile')
const path = "C:\\Users\\Alexis\\Desktop\\Programmes\\Discord\\Suggestions-Bot\\servers.json"

class Command {
  async exec(interaction, channel) {
    if (interaction.member.permissions.has('ADMINISTRATOR')) {
      let guildID = interaction.guild.id;
      const servers = JSON.readFileSync(path);

      if (servers[guildID] === undefined || servers[guildID] === null) {
        if (channel == null || channel == undefined) {
          return interaction.reply({
            embeds: [new MessageEmbed()
              .setColor('#ff0000')
              .setTitle('Veuillez spécifier un salon de suggestion')
            ]
          })
        }

        servers[guildID] = { channel: channel.id };

        JSON.writeFile(path, servers, function (err) {
          if (err) console.error(err)
        })

        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor('#00ff37')
            .setTitle('Le bot est désormais configuré pour ce serveur')
            .setDescription('Vous pouvez utiliser la commande `setup` pour changer les paramètres')]
        })
      } else {
        if (channel == null) {
          interaction.reply({
            embeds: [new MessageEmbed()
              .setColor('#0099ff')
              .setTitle('Le bot est déjà configuré pour ce serveur')
              .setDescription('Vous pouvez utiliser la commande `setup` pour changer les paramètres')
            ]
          })
        } else {
          servers[guildID] = { channel: channel.id };

          JSON.writeFile(path, servers, function (err) {
            if (err) console.error(err)
          })

          interaction.reply({
            embeds: [new MessageEmbed()
              .setColor('#00ff37')
              .setTitle('Le bot est désormais configuré pour ce serveur')
              .setDescription('Vous pouvez utiliser la commande `setup` pour changer les paramètres')
            ]
          })
        }
      }
    }
  }
}
module.exports = Command