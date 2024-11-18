import { Schema, model, connect } from "mongoose";
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./students/student.interface";

// Created Schema

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "First name can not allowed more than 20 characters"],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father Name is required"],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father Occupation is required"],
    trim: true,
  },
  fatherContactNumber: {
    type: String,
    required: [true, "Father Contact Number is required"],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, "Mother Name is required"],
    trim: true,
  },
  motherOccuaption: {
    type: String,
    required: [true, "Mother Occuaption is required"],
    trim: true,
  },
  motherContactNumber: {
    type: String,
    required: [true, "Mother Contact Number is required"],
    trim: true,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: [true, "Name is required"], trim: true },
  occupation: {
    type: String,
    required: [true, "Occupation is required"],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Contact No is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: [true, "ID is required"],
    unique: true,
    trim: true,
  },
  name: { type: userNameSchema, required: [true, "Name is Required"] },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not valid",
    },
    required: [true, "Gender is required"],
    trim: true,
  },
  dateOfBirth: { type: String, trim: true },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Contact Number is required"],
    trim: true,
  },
  emergencyNumber: {
    type: String,
    required: [true, "Emergency Number is required"],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    trim: true,
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address is required"],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent Address is required"],
    trim: true,
  },
  guardian: { type: guardianSchema, required: [true, "Guardian is required"] },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local Guardian is required"],
  },
  profileImage: { type: String, trim: true },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
    trim: true,
  },
});

export const StudentModel = model<Student>("Student", studentSchema);
