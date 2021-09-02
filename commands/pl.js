const { Queue } = require('discord-player');
const { SlashCommand } = require('slash-create');
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Interaction,
} = require('discord.js');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'playlist',
      description: 'See the playlist',

      guildIDs: process.env.DISCORD_GUILD_ID
        ? [process.env.DISCORD_GUILD_ID]
        : undefined,
    });
  }
  async run(ctx) {
    const { client } = require('..');
    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand()) return;

      if (interaction.commandName === 'pl') {
        const row = new MessageActionRow().addComponents(
          new MessageButton()
            .setCustomId('primary')
            .setLabel('TOMBOL')
            .setStyle('PRIMARY')
        );

        const embed = new MessageEmbed()
          .setColor('BLURPLE')
          .setTitle('EMBED TITLE ')
          .setDescription('Lorem \n saaasssdd');
        await interaction.reply({
          content: 'LAPOR!',
          embeds: [embed],
          components: [row],
        });
      }
    });
  }
};
