import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }
  const result = await Student.create(studentData); // built in static method
  console.log(result);
};

const getAllStudentsFromDB = async () => {
  const getStudents = await Student.find();
  return getStudents;
};

const getSingleStudentFromDB = async (id: string) => {
  // const getStudent = await Student.findOne({ id });
  const getStudent = await Student.aggregate([{ $match: { id: id } }]);
  return getStudent;
};

const deleteStudentStudentFromDB = async (id: string) => {
  const getStudent = await Student.updateOne({ id }, { isDeleted: true });
  return getStudent;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentStudentFromDB,
};
