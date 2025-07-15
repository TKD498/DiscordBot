import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("🏓 Pong!");
  }
});

client.login(process.env.DISCORD_TOKEN);

client.on("interactionCreate", async (interaction) => {
  console.log("⚡ Interaction received:", interaction.commandName); // add this line

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "cipherthis") {
    const input = interaction.options.getString("text");

    // Simple cipher: reverse + shift char codes
    const ciphered = input
      .split("")
      .reverse()
      .map((char) => String.fromCharCode(char.charCodeAt(0) + 3))
      .join("");

    await interaction.reply(`🔒 Encrypted: \`${ciphered}\``);
  }
});
