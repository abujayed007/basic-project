import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department created successfully",
    data: result,
  });
});

const getAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAcademicDepartmentFromDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department retrived successfully",
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department retrived successfully",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department updated successfully",
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
