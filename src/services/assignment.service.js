import Assignment from "../models/Assignment.js";

export async function addAssignment(title, dueDate, userID) {
  const lastAssignment = await Assignment.findOne({ user: userID }).sort({
    assignmentNumber: -1,
  });

  const assignmentNumber = lastAssignment
    ? lastAssignment.assignmentNumber + 1
    : 1;

  const assignment = await Assignment.create({
    user: userID,
    assignmentNumber,
    title,
    dueDate,
  });

  return assignment;
}
