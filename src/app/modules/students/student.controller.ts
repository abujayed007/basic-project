import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.zod.validation";

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentInfo } = req.body;
//     const zodParseData = studentValidationSchema.parse(studentInfo);
//     const result = await StudentServices.createStudentIntoDB(zodParseData);
//     res.status(200).json({
//       success: true,
//       message: "Student is created successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || "Something went wrong",
//       error: error,
//     });
//   }
// };

const getStudents = async (req: Request, res: Response) => {
  try {
    const results = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retreived successfully",
      data: results,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student find successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const StudentControllers = {
  getStudents,
  getSingleStudent,
  deleteStudent,
};
