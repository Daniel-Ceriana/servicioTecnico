const joi = require("joi");

const signUpValidator = (req, res, next) => {
  const schema = joi.object({
    fullName: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email": "wrong email format",
    }),
    password: joi
      .string()
      .min(8)
      .max(30)
      .pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/))
      .required()
      .messages({
        "string.min": "password must have a minimum of 8 characters debe",
        "string.max": "password must have a maximum of 30 characters",
        "string.pattern.base":
          "password must have at least one uppercase, lowercase and number",
      }),
  });
  const validation = schema.validate(req.body.userData, { abortEarly: false });
  if (validation.error) {
    return res.json({
      success: false,
      from: "validator",
      message: validation.error.details,
    });
  }

  next();
};

const signInValidator = (req, res, next) => {
  // before checking data values, checks if userData exists
  const schema = joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email": "wrong email format",
    }),
    password: joi.string().required(),
    //   agregar los required del from y aplication
  });
  const validation = schema.validate(req.body.userData, { abortEarly: false });
  if (validation.error) {
    return res.json({
      success: false,
      from: "validator",
      message: validation.error.details,
    });
  }

  next();
};

const updateUser = (req, res, next) => {
  const schema = joi.object({
    _id: joi.required(),
    fullName: joi.string(),
    email: joi.string().email({ minDomainSegments: 2 }).messages({
      "string.email": "wrong email format",
    }),
    password: joi
      .string()
      .min(8)
      .max(30)
      .pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/))
      .messages({
        "string.min": "password must have a minimum of 8 characters debe",
        "string.max": "password must have a maximum of 30 characters",
        "string.pattern.base":
          "password must have at least one uppercase, lowercase and number",
      }),
  });
  const validation = schema.validate(req.body.userData, { abortEarly: false });
  if (validation.error) {
    return res.json({
      success: false,
      from: "validator",
      message: validation.error.details,
    });
  }

  next();
};
const restorePasswordValidator = (req, res, next) => {
  console.log(req.uniqueString2)
  const schema = joi.object({
    uniqueString2: joi.string().required(),
    password: joi
      .string()
      .min(8)
      .max(30)
      .pattern(new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/))
      .required()
      .messages({
        "string.min": "password must have a minimum of 8 characters debe",
        "string.max": "password must have a maximum of 30 characters",
        "string.pattern.base":
          "password must have at least one uppercase, lowercase and number",
      }),
    // from: joi.string().required(),
    // aplication: joi.string().required(),
  });
  const validation = schema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    return res.json({
      success: false,
      from: "validator",
      message: validation.error.details,
    });
  }

  next();
};

module.exports = { signUpValidator, signInValidator, updateUser,restorePasswordValidator };
