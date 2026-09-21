import { scheduleSchema } from "../validations/schedule.validation.js";
import { addClass, getSchedule } from "../services/schedule.service.js";
import { format } from "date-fns";

// Function to handle adding classes
export async function handleAddClass(message) {
  const input = message.content.slice("!addclass".length).trim();

  const parts = input.split("|").map((part) => part.trim());
  const [course, day, startTime, endTime, location = ""] = parts;

  const { error, value } = scheduleSchema.validate({
    course,
    day,
    startTime,
    endTime,
    location,
  });

  if (error) {
    message.reply(
      "❌ Invalid class details.\n\n" +
        "Example:\n" +
        "`!addclass Database Systems | Monday | 10:00 | 12:00 | Room B204`",
    );
    return;
  }

  const schedule = await addClass(
    value.course,
    value.day,
    value.startTime,
    value.endTime,
    value.location,
    message.author.id,
  );

  message.reply(
    `✅ Class added!\n\n` +
      `📚 **${schedule.course}**\n\n` +
      `📅 ${schedule.day}\n\n` +
      `🕐 ${schedule.startTime} - ${schedule.endTime}\n\n` +
      `📍 ${schedule.location || "Location not specified"}`,
  );
}

// function to get the week schedule
export async function handleSchedule(message) {
  const schedule = await getSchedule(message.author.id);

  // if the user has not added schedule
  if (schedule.length === 0) {
    message.reply("📅 You don't have any classes scheduled yet!");
    return;
  }
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const scheduleList = days
    .map((day) => {
      const classes = schedule
        .filter((classItem) => classItem.day === day)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

      if (classes.length === 0) {
        return null;
      }

      const classList = classes
        .map(
          (classItem) =>
            `🕐 **${classItem.startTime} - ${classItem.endTime}**\n` +
            `📚 ${classItem.course}\n` +
            `📍 ${classItem.location || "Location not specified"}`,
        )
        .join("\n\n");

      return `**${day}**\n${classList}`;
    })
    .filter(Boolean)
    .join("\n\n");

  message.reply(`📅 **Your Weekly Schedule**\n\n${scheduleList}`);
}

// Function to get the next class
export async function handleToday(message) {
  const schedule = await getSchedule(message.author.id);

  if (schedule.length === 0) {
    message.reply("📅 You don't have any classes scheduled yet!");
    return;
  }

  const today = format(new Date(), "EEEE");

  const todayClasses = schedule
    .filter((classItem) => classItem.day === today)
    .sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );

  if (todayClasses.length === 0) {
    message.reply(
      `📅 **Today's Schedule — ${today}**\n\n` +
      "🎉 You don't have any classes today!"
    );
    return;
  }

  const classList = todayClasses
    .map(
      (classItem) =>
        `🕐 **${classItem.startTime} - ${classItem.endTime}**\n` +
        `📚 ${classItem.course}\n` +
        `📍 ${classItem.location || "Location not specified"}`
    )
    .join("\n\n");

  message.reply(
    `📅 **Today's Schedule — ${today}**\n\n${classList}`
  );
}