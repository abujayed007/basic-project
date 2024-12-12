import { model, Schema } from "mongoose";
import { TAcademicDepertment } from "./academicDepartment.interface";
import AppError from "../../errors/AppErrors";
import httpStatus from "http-status";

const academicDepertmentSchema = new Schema<TAcademicDepertment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: "AcademicFaculty",
  },
});

// academicDepertmentSchema.pre("save", async function (next) {
//   const isDepartmentExists = await AcademicDepertment.findOne({
//     name: this.name,
//   });
//   if (isDepartmentExists) {
//     throw new AppError(httpStatus.NOT_FOUND, "Department name already exists");
//   }
//   next();
// });

academicDepertmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepertment.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(404, "This department dose not exixts");
  }
  next();
});

export const AcademicDepertment = model<TAcademicDepertment>(
  "AcademicDepartment",
  academicDepertmentSchema
);
