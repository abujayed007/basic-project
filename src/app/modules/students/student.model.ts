import { Schema, model } from "mongoose";
import validator from "validator";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

const userNameSchema = new Schema<TUserName>({
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
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      unique: true,
      ref: "User",
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
    dateOfBirth: { type: Date, trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: "{VALUE} in not email type",
      },
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
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local Guardian is required"],
    },

    profileImage: { type: String, trim: true },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} +${this.name.middleName}+ ${this.name.lastName}`;
});

// pre/save middleware /hook: will work on create() save()

// Query Middleware

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// Virtual

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custome static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
