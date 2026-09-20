import { assignmentSchema } from "../validations/assignment.validation.js";
import {
  addAssignment,
  getAssignments,
  getAssignmentByNumber
} from "../services/assignment.service.js";
import { differenceInCalendarDays, format } from "date-fns";

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


// Function to get assignment deadline
export async function handleDeadline(message) {
  const assignmentNumber = Number(
    message.content.slice("!deadline".length).trim()
  );

  if (!Number.isInteger(assignmentNumber) || assignmentNumber <= 0) {
    message.reply(
      "❌ Please provide a valid assignment number.\nExample: `!deadline 1`"
    );
    return;
  }

  const assignment = await getAssignmentByNumber(
    message.author.id,
    assignmentNumber
  );

  if (!assignment) {
    message.reply("❌ Assignment not found.");
    return;
  }

  const daysRemaining = differenceInCalendarDays(
    assignment.dueDate,
    new Date()
  );

  const formattedDate = format(
    assignment.dueDate,
    "MMMM d, yyyy"
  );

  let deadlineMessage;

  if (daysRemaining > 1) {
    deadlineMessage = `⏳ Due in ${daysRemaining} days`;
  } else if (daysRemaining === 1) {
    deadlineMessage = "⏳ Due tomorrow";
  } else if (daysRemaining === 0) {
    deadlineMessage = "⚠️ Due today";
  } else {
    deadlineMessage = `🔴 Overdue by ${Math.abs(daysRemaining)} days`;
  }

  message.reply(
    `📅 **${assignment.title}**\n\n${deadlineMessage}\n\n📆 ${formattedDate}`
  );
}