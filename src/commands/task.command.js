import { addTask } from "../services/task.service.js";

export function handleAddTask(message) {
  const title = message.content.slice("!addtask".length).trim();

  if (!title) {
    message.reply("❌ Please provide a task.\nExample: `!addtask Finish OOP assignment`");
    return;
  }

  const task = addTask(title);

  message.reply(`✅ Task added!\n\n📚 **${task.title}**`);
}