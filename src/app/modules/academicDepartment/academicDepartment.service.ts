import { TAcademicDepertment } from "./academicDepartment.interface";
import { AcademicDepertment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepertment) => {
  const result = await AcademicDepertment.create(payload);
  return result;
};

const getAcademicDepartmentFromDB = async (payload: TAcademicDepertment) => {
  const result =
    await AcademicDepertment.find(payload).populate("academicFaculty");
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepertment.findById(id).populate("academicFaculty");
  return result;
};
const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: TAcademicDepertment
) => {
  const result = await AcademicDepertment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
