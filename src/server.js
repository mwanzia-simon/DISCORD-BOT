import "dotenv/config";
import os from "node:os";
import { exec } from "node:child_process";
import { Client, GatewayIntentBits } from "discord.js";
import {
  handleAddTask,
  handleTasks,
  handleDone,
  handleDelete,
} from "./commands/task.command.js";

import { handleHelp } from "./commands/help.command.js";
import {
  handleAddAssignment,
  handleAssignments,
} from "./commands/assignment.command.js";

import { connectDB } from "./config/db.js";

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
  // To prevent the bot from replaying to his messages
  if (message.author.bot) return;

  if (message.content === "!hello") {
    message.reply("Hello, my name is Neuron! 👋");
  }

  // Handling the tasks feature
  if (message.content === "!tasks") {
    handleTasks(message);
  }

  if (message.content.startsWith("!addtask")) {
    handleAddTask(message);
  }
  if (message.content.startsWith("!done")) {
    handleDone(message);
  }
  if (message.content.startsWith("!delete")) {
    handleDelete(message);
  }

  // Handling assignment feature
  if (message.content.startsWith("!addassignment")) {
    handleAddAssignment(message);
  }
  if (message.content === "!assignments") {
    handleAssignments(message);
  }

  if (message.content === "!help") {
    handleHelp(message);
  }
});

await connectDB();
client.login(process.env.BOT_TOKEN);
