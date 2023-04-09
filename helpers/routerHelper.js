const Joi = require("@hapi/joi");

const validateBody = (schema, obj) => {
   const validatorResult = schema.validate(obj, { abortEarly: false });

   if (validatorResult.error) {
      return false;
   } else return true;
};

const schemas = {
   authSignUpSchema: Joi.object().keys({
      fullName: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
   }),
   authSignInSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
   }),
   productSchema: Joi.object().keys({
      name: Joi.string().min(6),
      price: Joi.number().required(),
      color: Joi.string(),
      category: Joi.string(),
   }),
   userSchema: Joi.object().keys({
      fullName: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
   }),
};

module.exports = {
   validateBody,
   schemas,
};
