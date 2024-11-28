import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (studentData: TUser) => {
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error("User already exists");
  //   }
  const result = await User.create(studentData); // built in static method
  console.log(result);
};

export const UserService = {
  createStudentIntoDB,
};
