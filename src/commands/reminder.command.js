import { addMinutes, addHours, addDays } from "date-fns";
import { addReminder } from "../services/reminder.service.js";

export async function handleAddReminder(message) {
  const input = message.content
    .slice("!remind".length)
    .trim();

  const parts = input.split(" ");

  const time = parts.shift();
  const reminderMessage = parts.join(" ").trim();

  if (!time || !reminderMessage) {
    message.reply(
      "❌ Invalid reminder.\n\n" +
        "Examples:\n" +
        "`!remind 30m Study OOP`\n" +
        "`!remind 2h Finish assignment`\n" +
        "`!remind 1d Submit project`"
    );
    return;
  }

  const match = time.match(/^(\d+)(m|h|d)$/i);

  if (!match) {
    message.reply(
      "❌ Invalid time format.\n\n" +
        "Use:\n" +
        "`30m` — 30 minutes\n" +
        "`2h` — 2 hours\n" +
        "`1d` — 1 day"
    );
    return;
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();

  let remindAt = new Date();

  if (unit === "m") {
    remindAt = addMinutes(remindAt, amount);
  }

  if (unit === "h") {
    remindAt = addHours(remindAt, amount);
  }

  if (unit === "d") {
    remindAt = addDays(remindAt, amount);
  }

  const reminder = await addReminder(
    message.author.id,
    reminderMessage,
    remindAt
  );

  message.reply(
    `⏰ **Reminder set!**\n\n` +
      `📚 ${reminder.message}\n` +
      `🕐 ${reminder.remindAt.toLocaleString()}`
  );
}