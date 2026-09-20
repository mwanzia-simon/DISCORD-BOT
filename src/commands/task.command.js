import {
  addTask,
  getTasks,
  completeTask,
  deleteTask,
} from "../services/task.service.js";

export async function handleAddTask(message) {
  const title = message.content.slice("!addtask".length).trim();

  if (!title) {
    message.reply(
      "❌ Please provide a task.\nExample: `!addtask Finish OOP assignment`",
    );
    return;
  }

  const task = await addTask(title,message.author.id);

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

export function handleDone(message) {
  const id = Number(message.content.slice("!done".length).trim());

  // If the user does not provide a task id
  if (!id) {
    message.reply("❌ Please provide a task ID.\nExample: `!done 1`");
    return;
  }
  const task = completeTask(id);

  // If the task with that id does not exist
  if (!task) {
    message.reply("❌ Task not found.");
    return;
  }

  message.reply(`✅ Task completed!\n\n📚 **${task.title}**`);
}

export function handleDelete(message) {
  const id = Number(message.content.slice("!delete".length).trim());

  if (!id) {
    message.reply("❌ Please provide a task ID.\nExample: `!delete 1`");
    return;
  }

  const task = deleteTask(id);

  if (!task) {
    message.reply("❌ Task not found.");
    return;
  }

  message.reply(`🗑️ Task deleted!\n\n📚 **${task.title}**`);
}
