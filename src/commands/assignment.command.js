import { assignmentSchema } from "../validations/assignment.validation.js";
import {
  addAssignment,
  getAssignments,
} from "../services/assignment.service.js";

// A handler for adding assignments
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

// A handler for getting all assignments
export async function handleAssignments(message) {
  const assignments = await getAssignments(message.author.id);

  if (assignments.length === 0) {
    message.reply("📚 You don't have any assignments yet!");
    return;
  }

  const assignmentList = assignments
    .map((assignment) => {
      const status = assignment.completed ? "✅" : "⏳";

      return `${status} **#${assignment.assignmentNumber}** ${assignment.title}\n\n📅 Due: ${assignment.dueDate.toDateString()}`;
    })
    .join("\n\n");

  message.reply(`📚 **Your Assignments**\n\n${assignmentList}`);
}
