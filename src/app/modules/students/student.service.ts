import { TStudent } from "./student.interface";
import { Student } from "./student.model";
import mongoose from "mongoose";
import AppError from "../../errors/AppErrors";
import { User } from "../user/user.model";
import httpStatus from "http-status";
import { optional } from "joi";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.const";

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }
  const result = await Student.create(studentData); // built in static method
  console.log(result);
};

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };
  //{email:{$regex: query.searchTerm, $options:i}}
  //{name:{$regex: query.searchTerm, $options:i}}
  // let searchTerm = "";
  // if (query.searchTerm) {
  //   searchTerm = query.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });
  // Filering -------
  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeFields.forEach((elem) => delete queryObj[elem]);
  // // console.log({ query, queryObj });
  // const filterQuery = searchQuery
  //   .find(queryObj)
  // .populate("admissionSemester")
  // .populate({ path: "academicDepartment", populate: "academicFaculty" });
  // let sort = "-createdAt";
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);
  // let fields = "-__v";
  // if (query.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  // }
  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate("admissionSemester")
      .populate({ path: "academicDepartment", populate: "academicFaculty" }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const getStudent = await Student.findOne({ id });
  const getStudent = await Student.findOne({ id })
    .populate("admissionSemester")
    .populate({ path: "academicDepartment", populate: "academicFaculty" });
  return getStudent;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...reamainingStudent } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...reamainingStudent };
  /*
  guardian:{
  fatherOccuepation: Teacher}

  guardianFatherOccuepation : Teacher
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  // console.log(modifiedUpdatedData);
  const getStudent = await Student.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    { new: true, runValidators: true }
  );
  return getStudent;
};

const deleteStudentStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentStudentFromDB,
  updateStudentIntoDB,
};
