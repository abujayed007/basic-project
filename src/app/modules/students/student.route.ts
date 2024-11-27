import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

// will call controller function
router.post("/create-student", StudentControllers.createStudent);
router.delete("/:studentId", StudentControllers.deleteStudent);
router.get("/:studentId", StudentControllers.getSingleStudent);
router.get("/", StudentControllers.getStudents);

export const StudentRoutes = router;
