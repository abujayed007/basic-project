import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemisterNameCodeMapper,
  TMonths,
} from "./academicSemester.interface";

export const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemisterName: TAcademicSemesterName[] = [
  "Autumn",
  "Summar",
  "Fall",
];
export const AcademicSemisterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

export const academicSemisterNameCodeMapper: TAcademicSemisterNameCodeMapper = {
  Autumn: "01",
  Summar: "02",
  Fall: "03",
};
