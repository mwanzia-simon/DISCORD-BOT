import { assignmentSchema } from "../validations/assignment.validation.js";
import { addAssignment } from "../services/assignment.service.js";

export async function handleAddAssignment(message) {
  const input = message.content.slice("!addassignment".length).trim();

  const parts = input.split(" ");
  const dueDate = parts.pop();
  const title = parts.join(" ");

  const { error, value } = assignmentSchema.validate({
    title,
    dueDate,
  });

  if (error) {
    message.reply(
      "❌ Invalid assignment.\n\nExample: `!addassignment Finish database project 2026-09-25`",
    );
    return;
  }

  const assignment = await addAssignment(
    value.title,
    value.dueDate,
    message.author.id,
  );

  message.reply(
    `✅ Assignment added!\n\n📚 **${assignment.title}**\n\n 📅 Due: ${assignment.dueDate.toDateString()}`,
  );
}
