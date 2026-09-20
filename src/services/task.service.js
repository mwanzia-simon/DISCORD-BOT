const tasks = [];

export function addTask(title) {
  const task = {
    id: tasks.length + 1,
    title,
    completed: false,
  };

  tasks.push(task);

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
