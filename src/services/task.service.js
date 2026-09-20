const tasks = [];
let nextTaskId = 1;

export function addTask(title) {
  const task = {
    id: nextTaskId,
    title,
    completed: false,
  };

  tasks.push(task);
  nextTaskId++;

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
