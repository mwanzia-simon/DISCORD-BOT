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

// Function to get all the tasks from the database
export async function getTasks(userID) {
  const tasks = await Task.find({ user: userID }).sort({ taskNumber: 1 });
  return tasks;
}

export async function completeTask(userID, taskNumber) {
  const task = await Task.findOneAndUpdate(
    { user: userID, taskNumber },
    { completed: true },
    { returnDocument: "after" },
  );

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
