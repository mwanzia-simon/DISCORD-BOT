import { addTask, getTasks } from "../services/task.service.js";

export function handleAddTask(message) {
  const title = message.content.slice("!addtask".length).trim();

  if (!title) {
    message.reply(
      "❌ Please provide a task.\nExample: `!addtask Finish OOP assignment`",
    );
    return;
  }

  const task = addTask(title);

  message.reply(`✅ Task added!\n\n📚 **${task.title}**`);
}

export function handleTasks(message) {
  const tasks = getTasks();

  // Checking if the user has tasks
  if (tasks.length === 0) {
    message.reply("📚 You don't have any tasks yet!");
    return;
  }

  // Creating a well formated task list
  const taskList = tasks
    .map((task) => {
      const status = task.completed ? "✅" : "⏳";
      return `${status} **${task.id}.** ${task.title}`;
    })
    .join("\n\n");

  message.reply(`📋 **Your Tasks**\n\n${taskList}`);
}
