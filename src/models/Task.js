import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },

    taskNumber: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;