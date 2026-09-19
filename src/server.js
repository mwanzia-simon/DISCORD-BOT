import "dotenv/config";
import os from "node:os";
import { exec } from "node:child_process";
import { Client, GatewayIntentBits } from "discord.js";

const quotes = [
  "The secret of getting ahead is getting started.",
  "Don't watch the clock; do what it does. Keep going.",
  "Great things are done by a series of small things brought together.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "It always seems impossible until it's done.",
  "The future depends on what you do today.",
  "Success is built one small step at a time.",
];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once("clientReady", (client) => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "!hello") {
    message.reply("Hello, my name is Neuron! 👋");
  }

  if (message.content === "!system") {
    const systemInfo = `
🖥️ **System Information**

💻 OS: ${os.platform()}
🏗️ Architecture: ${os.arch()}
🧠 CPU Cores: ${os.cpus().length}
💾 Total RAM: ${(os.totalmem() / 1024 ** 3).toFixed(2)} GB
📦 Free RAM: ${(os.freemem() / 1024 ** 3).toFixed(2)} GB
⏱️ Uptime: ${(os.uptime() / 3600).toFixed(2)} hours
    `;

    message.reply(systemInfo);
  }

  if (message.content === "!notepad") {
    exec("notepad.exe", (error) => {
      if (error) {
        console.error(error);
        message.reply("❌ Couldn't open Notepad.");
        return;
      }

      message.reply("📝 Notepad opened!");
    });
  }

  if (message.content === "!quote") {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    message.reply(`💭 "${randomQuote}"`);
  }

  if (message.content.startsWith("!chrome")) {
    const url = message.content.split(" ")[1];

    if (!url) {
      message.reply("❌ Please provide a URL.");
      return;
    }

    exec(`start chrome "${url}"`, (error) => {
      if (error) {
        console.error(error);
        message.reply("❌ Couldn't open Chrome.");
        return;
      }

      message.reply(`🌐 Opening ${url}`);
    });
  }
});

client.login(process.env.BOT_TOKEN);
