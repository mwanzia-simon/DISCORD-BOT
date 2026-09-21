import Schedule from "../models/Schedule.js";

export async function addClass(
  course,
  day,
  startTime,
  endTime,
  location,
  userID,
) {
  const lastClass = await Schedule.findOne({ user: userID }).sort({
    classNumber: -1,
  });

  const classNumber = lastClass ? lastClass.classNumber + 1 : 1;

  const schedule = await Schedule.create({
    user: userID,
    classNumber,
    course,
    day,
    startTime,
    endTime,
    location,
  });

  return schedule;
}

// Function to print the week timetable
export async function getSchedule(userId) {
  const schedule = await Schedule.find({
    user: userId,
  });

  return schedule;
}