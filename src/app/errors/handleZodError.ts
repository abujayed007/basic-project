import { ZodError, ZodIssue } from "zod";
import { TGenericErrorsResponse } from "../interfaces/error";

export const handleZodError = (err: ZodError): TGenericErrorsResponse => {
  const statusCode = 400;

  const errorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};
