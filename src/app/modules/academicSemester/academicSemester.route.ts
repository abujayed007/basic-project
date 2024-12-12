import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controllers";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);

router.get("/", AcademicSemesterControllers.getAllAcademicSemesters);
router.get(
  "/:semesterId",
  AcademicSemesterControllers.getSingleAcademicSemester
);

router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
);

// router.delete("/:studentId", StudentControllers.deleteStudent);
// router.get("/:studentId", StudentControllers.getSingleStudent);
// router.get("/", StudentControllers.getStudents);

export const AcademicSemesterRoutes = router;
