import { AcademicFaculty } from "./academicFaculty.model";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyService } from "./academicFaculty.service";
import { date } from "joi";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty created successfully",
    data: result,
  });
});

const getAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAcademicFacultiesFromDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic facultied retrived successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty retrived successfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyService.updateAcademicFacultyIntoDB(
    facultyId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty updated successfully",
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
