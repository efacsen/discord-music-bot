const { Queue } = require('discord-player');
const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'remove',
      description: 'Remove track from queue',
      options: [
        {
          name: 'tracks',
          description: 'The index number of tracks to remove',
          type: CommandOptionType.INTEGER,
        },
      ],
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
    const removeTrackIndex = ctx.options.tracks + 1;
    console.log(
      '🚀🚀 ~ file: remove.js ~ line 36 ~ removeTrackIndex',
      removeTrackIndex
      );
      queue = queue.filter(item => item !== removeTrackIndex);

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
          thumbnail: { url: `${currentTrack.thumbnail}` },
          fields: [
            {
              name: 'Total Songs',
              value: `${queue.tracks.length + 1} songs`,
              inline: true,
            },
            {
              //TODO: Convert Total duration to hour after 60mins
              name: 'Total Duration',
              value: `${Math.floor(
                (queue.totalTime + currentTrack.duration) / 60000
              )} minutes`,
              inline: true,
            },
          ],
        },
      ],
    });
  }
};
