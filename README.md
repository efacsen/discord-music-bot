# Discord Music Bot

The perfect music bot for your Discord server! 🤘

## Features

* Slash Commands
* YouTube, SoundCloud, Facebook and Vimeo support

## About

The project uses the following libraries:

* **[Androz2091/discord-player](https://github.com/Androz2091/discord-player)** library for the core music features
* **[discordjs](https://github.com/discordjs/discord.js)** for all the other requests to the Discord API
* **[@discordjs/voice](https://github.com/discordjs/voice)** for all the **voice** requests to the Discord API
* **[@discordjs/opus](https://github.com/discordjs/opus)** as the opus library
* **[FFMPEG](https://ffmpeg.org)** to encode the stream

## Installation

* Clone the repository. (`git clone https://github.com/Androz2091/discord-music-bot`)
* Copy the `.env.example` file as `.env` and fill it.
 - `DISCORD_CLIENT_ID` is the ID of your Discord BOT
 - `DISCORD_CLIENT_TOKEN` is the token of your Discord BOT
* Install the dependencies. (`yarn install` or `npm install`)
* Start the bot! (`node .`)