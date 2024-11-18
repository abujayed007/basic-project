import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const getStudents = await StudentModel.find();
  return getStudents;
};

const getSingleStudentFromDB = async (id: string) => {
  const getStudent = await StudentModel.findOne({ id });
  return getStudent;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
