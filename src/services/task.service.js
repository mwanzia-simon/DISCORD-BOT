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
