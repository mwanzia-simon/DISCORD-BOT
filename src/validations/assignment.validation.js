import Joi from "joi";

export const assignmentSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .required(),

  dueDate: Joi.date()
    .iso()
    .required(),
});