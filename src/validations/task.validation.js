import Joi from "joi";

export const taskNumberSchema = Joi.number().integer().positive().required();
