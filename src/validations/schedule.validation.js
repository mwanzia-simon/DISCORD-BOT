import Joi from "joi";

export const scheduleSchema = Joi.object({
  course: Joi.string()
    .trim()
    .min(1)
    .required(),

  day: Joi.string()
    .valid(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    )
    .required(),

  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),

  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),

  location: Joi.string()
    .trim()
    .allow("")
    .optional(),
});