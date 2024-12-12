import express from "express";
import { AcademicDepartmentController } from "./academicDepartment.controller";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-academic-department",
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepertmentValidationSchema
  // ),
  AcademicDepartmentController.createAcademicDepartment
);
router.get(
  "/:departmentId",
  AcademicDepartmentController.getSingleAcademicDepartment
);
router.patch(
  "/:departmentId",
  AcademicDepartmentController.updateAcademicDepartment
);
router.get("/", AcademicDepartmentController.getAcademicDepartment);

export const AcademicDepartmentRoutes = router;
