import { z } from "zod";

// UserName Validation Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, "First Name is required")
    .max(20, "First name cannot exceed 20 characters")
    .trim(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, "Last Name is required")
    .trim()
    .regex(/^[A-Za-z]+$/, "Last Name must contain only letters"),
});

// Guardian Validation Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father Name is required").trim(),
  fatherOccupation: z.string().min(1, "Father Occupation is required").trim(),
  fatherContactNumber: z
    .string()
    .min(1, "Father Contact Number is required")
    .trim(),
  motherName: z.string().min(1, "Mother Name is required").trim(),
  motherOccuaption: z.string().min(1, "Mother Occupation is required").trim(),
  motherContactNumber: z
    .string()
    .min(1, "Mother Contact Number is required")
    .trim(),
});

// Local Guardian Validation Schema
const localGuardianValidationSchema = z
  .object({
    name: z.string().min(1, "Name is required").trim(),
    occupation: z.string().min(1, "Occupation is required").trim(),
    contactNo: z.string().min(1, "Contact No is required").trim(),
    address: z.string().min(1, "Address is required").trim(),
  })
  .required();

// Main Student Validation Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, "ID is required").trim(),
  password: z.string().max(20, "Password is required"),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is not valid" }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .min(5, "Email is required")
    .email("Invalid email format")
    .trim(),
  contactNumber: z.string().min(1, "Contact Number is required").trim(),
  emergencyNumber: z.string().min(1, "Emergency Number is required").trim(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1, "Present Address is required").trim(),
  permanentAddress: z.string().min(1, "Permanent Address is required").trim(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
