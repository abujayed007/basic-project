import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { studentValidationsSchema } from "./student.validation";

const router = express.Router();

router.get("/:studentId", StudentControllers.getSingleStudent);
router.patch(
  "/:studentId",
  validateRequest(studentValidationsSchema.updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.delete("/:studentId", StudentControllers.deleteStudent);
router.get("/", StudentControllers.getStudents);

export const StudentRoutes = router;
