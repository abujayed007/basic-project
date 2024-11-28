const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentInfo } = req.body;
    const zodParseData = studentValidationSchema.parse(studentInfo);
    const result = await StudentServices.createStudentIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
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

export const UserService = {
  createStudent,
};
