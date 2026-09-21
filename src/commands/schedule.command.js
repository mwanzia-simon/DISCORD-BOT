import { scheduleSchema } from "../validations/schedule.validation.js";
import { addClass } from "../services/schedule.service.js";

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
      `📚 **${schedule.course}**\n` +
      `📅 ${schedule.day}\n` +
      `🕐 ${schedule.startTime} - ${schedule.endTime}\n` +
      `📍 ${schedule.location || "Location not specified"}`,
  );
}
