import Task from "../models/Task.js";

const tasks = [];
let nextTaskId = 1;

// Function to add tasks to database
export async function addTask(title, userID) {
  const lastTask = await Task.findOne({ user: userID }).sort({
    taskNumber: -1,
  });

  const taskNumber = lastTask ? lastTask.taskNumber + 1 : 1;

  const task = await Task.create({
    user: userID,
    taskNumber,
    title,
  });

  return task;
}

export function getTasks() {
  return tasks;
}

export function completeTask(id) {
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return null;
  }

  task.completed = true;

  return task;
}

// A function to delete the tasks
export function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  const deleteTask = tasks[taskIndex];

  tasks.splice(taskIndex, 1);
  return deleteTask;
}
