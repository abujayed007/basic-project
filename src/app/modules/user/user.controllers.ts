import httpStatus from "http-status";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import { error } from "console";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentInfo } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentInfo);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student created successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
