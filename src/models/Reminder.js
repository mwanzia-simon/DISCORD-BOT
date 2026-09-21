import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    remindAt: {
      type: Date,
      required: true,
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

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;