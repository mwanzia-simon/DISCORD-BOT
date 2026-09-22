import cron from "node-cron";
import {
  getDueReminders,
  completeReminder,
} from "./reminder.service.js";

export function startReminderScheduler(client) {
  cron.schedule("* * * * *", async () => {
    const reminders = await getDueReminders();

    for (const reminder of reminders) {
      try {
        const user = await client.users.fetch(reminder.user);

        await user.send(
          `🔔 **Reminder!**\n\n📚 ${reminder.message}`
        );

        await completeReminder(reminder._id);

        console.log(
          `🔔 Reminder sent to ${user.tag}: ${reminder.message}`
        );
      } catch (error) {
        console.error(
          `❌ Failed to send reminder ${reminder._id}:`,
          error
        );
      }
    }
  });

  console.log("⏰ Reminder scheduler started.");
}