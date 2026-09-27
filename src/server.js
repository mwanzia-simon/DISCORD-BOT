import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import http from "http";
import { startReminderScheduler } from "./services/reminder.scheduler.js";
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
  handleDeadline,
} from "./commands/assignment.command.js";

import {
  handleAddClass,
  handleSchedule,
  handleToday,
  handleNextClass,
} from "./commands/schedule.command.js";

import { handleAddReminder } from "./commands/reminder.command.js";

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
  startReminderScheduler(client);
});

client.on("error", (error) => {
  console.error("❌ Discord client error:", error);
});

client.on("warn", (warning) => {
  console.warn("⚠️ Discord warning:", warning);
});

client.on("debug", (info) => {
  console.log("🔍 Discord debug:", info);
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
  if (message.content.startsWith("!deadline")) {
    handleDeadline(message);
  }

  // functions to handle class scheduling
  if (message.content.startsWith("!addclass")) {
    handleAddClass(message);
  }
  if (message.content === "!schedule") {
    handleSchedule(message);
  }
  if (message.content === "!today") {
    handleToday(message);
  }
  if (message.content === "!nextclass") {
    handleNextClass(message);
  }
  // Reminder functions
  if (message.content.startsWith("!remind")) {
    handleAddReminder(message);
  }
  if (message.content === "!help") {
    handleHelp(message);
  }
});

await connectDB();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end("Neuron is running!");
});

server.listen(PORT, () => {
  console.log(`🌐 HTTP server running on port ${PORT}`);
});

console.log("🚀 Attempting Discord login...");

console.log(
  "BOT_TOKEN length:",
  process.env.BOT_TOKEN?.length
);

client
  .login(process.env.BOT_TOKEN)
  .then(() => {
    console.log("🤖 Discord login successful!");
  })
  .catch((error) => {
    console.error("❌ Discord login failed:", error);
  });
