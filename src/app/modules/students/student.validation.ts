import { z } from "zod";

// UserName Validation Schema
const createUserNameValidationSchema = z.object({
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
const createGuardianValidationSchema = z.object({
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
const createLocalGuardianValidationSchema = z
  .object({
    name: z.string().min(1, "Name is required").trim(),
    occupation: z.string().min(1, "Occupation is required").trim(),
    contactNo: z.string().min(1, "Contact No is required").trim(),
    address: z.string().min(1, "Address is required").trim(),
  })
  .required();

// Main Student Validation Schema
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
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
      permanentAddress: z
        .string()
        .min(1, "Permanent Address is required")
        .trim(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});

// UserName Validation Schema
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidationsSchema = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
