import dotenv from "dotenv";
dotenv.config();
import { REST, Routes, SlashCommandBuilder } from "discord.js";

const commands = [
  new SlashCommandBuilder()
    .setName("cipherthis")
    .setDescription("Turn your message into a jumbled secret mess")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("The text to cipher")
        .setRequired(true)
    )
    .toJSON(),
];

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("📡 Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ), // 👈 THIS is the fix
      { body: commands }
    );

    console.log("✅ Slash commands registered.");
  } catch (err) {
    console.error("❌ Failed to register commands:", err);
  }
})();
