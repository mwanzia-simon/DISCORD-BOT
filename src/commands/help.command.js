export function handleHelp(message) {
  message.reply(
    `🤖 **Neuron Commands**

📚 **Tasks**
\`!addtask <task>\` — Add a new task
\`!tasks\` — View your tasks
\`!done <number>\` — Complete a task
\`!delete <number>\` — Delete a task

📝 **Assignments**
\`!addassignment <title> <date>\` — Add an assignment
\`!assignments\` — View your assignments
\`!deadline <number>\` — Check an assignment deadline

⏰ **Reminders**
\`!remind <time> <message>\` — Set a reminder
\`!reminders\` — View active reminders

💡 **Examples**

\`!addtask Finish OOP assignment\`

\`!addassignment Database project 2026-09-25\`

\`!addclass Database Systems | Monday | 10:00 | 12:00 | Room B204\`

\`!remind 30m Study OOP
`
  );
}