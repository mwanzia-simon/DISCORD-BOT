import {
  addTask,
  getTasks,
  completeTask,
  deleteTask,
} from "../services/task.service.js";
import { taskNumberSchema } from "../validations/task.validation.js";

export async function handleAddTask(message) {
  const title = message.content.slice("!addtask".length).trim();

  if (!title) {
    message.reply(
      "❌ Please provide a task.\nExample: `!addtask Finish OOP assignment`",
    );
    return;
  }

  const task = await addTask(title, message.author.id);

  message.reply(`✅ Task added!\n\n📚 **${task.title}**`);
}

export async function handleTasks(message) {
  const tasks = await getTasks(message.author.id);

  // Checking if the user has tasks
  if (tasks.length === 0) {
    message.reply("📚 You don't have any tasks yet!");
    return;
  }

  // Creating a well formated task list
  const taskList = tasks
    .map((task) => {
      const status = task.completed ? "✅" : "⏳";
      return `${status} **${task.taskNumber}.** ${task.title}`;
    })
    .join("\n\n");

  message.reply(`📋 **Your Tasks**\n\n${taskList}`);
}

// Function to mark a task as completed
export async function handleDone(message) {
  const taskNumber = Number(message.content.slice("!done".length).trim());

  const { error } = taskNumberSchema.validate(taskNumber);

  if (error) {
    message.reply("❌ Please provide a valid task number.\nExample: `!done 1`");
    return;
  }

  const task = await completeTask(message.author.id, taskNumber);

  // If the task with that id does not exist
  if (!task) {
    message.reply("❌ Task not found.");
    return;
  }
  message.reply(`✅ Task completed!\n\n📚 **${task.title}**`);
}

// Function to delete a task
export async function handleDelete(message) {
  const taskNumber = Number(message.content.slice("!delete".length).trim());
  const { error } = taskNumberSchema.validate(taskNumber);

  if (error) {
    message.reply("❌ Please provide a valid task number.\nExample: `!done 1`");
    return;
  }

  const task = await deleteTask(message.author.id, taskNumber);

  if (!task) {
    message.reply("❌ Task not found.");
    return;
  }

  message.reply(`🗑️ Task deleted!\n\n📚 **${task.title}**`);
}
