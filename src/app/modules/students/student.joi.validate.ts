import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*$/, "{VALUE} is not in capitalized format"),
  middleName: Joi.string().trim().allow(null, "").optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/, "{VALUE} is not valid"),
});

// guardian schema validation with joi

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContactNumber: Joi.string().trim().required(),
  motherName: Joi.string().trim().required(),
  motherOccuaption: Joi.string().trim().required(),
  motherContactNumber: Joi.string().trim().required(),
});

// localGuardian schema validation with joi

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});

// student schema validation with joi

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().trim().valid("male", "female", "other").required(),
  dateOfBirth: Joi.string().trim().optional(),
  email: Joi.string().trim().email().required(),
  contactNumber: Joi.string().trim().required(),
  emergencyNumber: Joi.string().trim().required(),
  bloodGroup: Joi.string()
    .trim()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional(),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string().trim().optional(),
  isActive: Joi.string().trim().valid("active", "blocked").default("active"),
});

export default studentValidationSchema;
