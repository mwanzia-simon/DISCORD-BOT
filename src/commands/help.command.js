export function handleHelp(message) {
  message.reply(
    `🤖 **Neuron Commands**

📚 **Tasks**
\`!addtask <task>\` — Add a new task
\`!tasks\` — View your tasks
\`!done <number>\` — Complete a task
\`!delete <number>\` — Delete a task

📅 **Coming Soon**
Assignments
Schedule
Reminders
Study tracking

💡 **Example**
\`!addtask Finish OOP assignment\`
\`!tasks\`
\`!done 1\`
\`!delete 2\`
`
  );
}