import { AcademicSemesterRoutes } from "./../modules/academicSemester/academicSemester.route";
import { Router } from "express";
import { StudentRoutes } from "../modules/students/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicFacultiesRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
  {
    path: "/academic-faculties",
    route: AcademicFacultiesRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

// router.use("/students", StudentRoutes);
// router.use("/users", UserRoutes);

export default router;
