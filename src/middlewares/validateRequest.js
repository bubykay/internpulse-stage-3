import Joi from "joi";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) =>
        detail.message.replace(/"/g, "")
      );
      return res.status(400).json(errors);
    }

    next();
  };
};

export default validateRequest;
