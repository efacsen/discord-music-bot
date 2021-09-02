const { Queue } = require('discord-player');
const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'queue',
      description: 'See the queue',

      guildIDs: process.env.DISCORD_GUILD_ID
        ? [process.env.DISCORD_GUILD_ID]
        : undefined,
    });
  }

  async run(ctx) {
    const { client } = require('..');

    await ctx.defer();
    const queue = client.player.getQueue(ctx.guildID);
    if (!queue || !queue.playing)
      return void ctx.sendFollowUp({
        content: '❌ | No music is being played!',
      });
    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 30).map((m, i) => {
      return `${i + 1}. ${m.author} - ${m.title} ([Source](${m.url}))`;
    });
    //TODO: Mask the source url behind the title
    return void ctx.sendFollowUp({
      embeds: [
        {
          title: 'Playlist:',
          description: `**Now playing:**\n **-->** *${currentTrack.author} - ${
            currentTrack.title
          } (${currentTrack.duration}) - ([Source](${
            currentTrack.url
          }))* **<--**\n**Next:**\n${tracks.join('\n')}${
            queue.tracks.length > tracks.length
              ? `\n...${
                  queue.tracks.length - tracks.length === 1
                    ? `${queue.tracks.length - tracks.length} more track`
                    : `${queue.tracks.length - tracks.length} more tracks`
                }`
              : ''
          }`,
          color: 0xffaaff,
          thumbnail: {url:`${currentTrack.thumbnail}` },
          fields: [
            {
              name: 'Total Songs',
              value: `${queue.tracks.length + 1} songs`,
              inline: true,
            },
            {
              name: 'Total Duration',
              value: `${Math.floor(queue.totalTime / 60000)} minutes`,
              inline: true,
            },
          ],
        },
      ],
    });
  }
};
