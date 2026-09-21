import Reminder from "../models/Reminder.js";

export async function addReminder(userId, message, remindAt) {
  const reminder = await Reminder.create({
    user: userId,
    message,
    remindAt,
  });

  return reminder;
}

export async function getReminders(userId) {
  const reminders = await Reminder.find({
    user: userId,
    completed: false,
  }).sort({
    remindAt: 1,
  });

  return reminders;
}

export async function getDueReminders() {
  const reminders = await Reminder.find({
    completed: false,
    remindAt: {
      $lte: new Date(),
    },
  });

  return reminders;
}

export async function completeReminder(reminderId) {
  const reminder = await Reminder.findByIdAndUpdate(
    reminderId,
    {
      completed: true,
    },
    {
      returnDocument: "after",
    }
  );

  return reminder;
}