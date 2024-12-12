import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controllers";
import { AnyZodObject } from "zod";

import validateRequest from "../../middleware/validateRequest";
import { studentValidationsSchema } from "../students/student.validation";

const router = express.Router();

// will call controller function
router.post(
  "/create-student",
  validateRequest(studentValidationsSchema.createStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;
