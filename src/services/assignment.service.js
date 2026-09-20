import Assignment from "../models/Assignment.js";

// function to create a new assignment
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

// A function to view all the assignments created
export async function getAssignments(userID) {
  const assignments = await Assignment.find({
    user: userID,
  }).sort({
    assignmentNumber: 1,
  });
  return assignments;
}
