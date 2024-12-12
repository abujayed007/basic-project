import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemisterCode,
  AcademicSemisterName,
  Months,
} from "./academicSemeste.constant";

const academicSemisterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemisterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemisterCode,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
academicSemisterSchema.pre("save", async function (next) {
  const isSemisterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemisterExists) {
    throw new Error("Semister is already exists");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemisterSchema
);
