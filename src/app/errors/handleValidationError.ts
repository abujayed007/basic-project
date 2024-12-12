import mongoose from "mongoose";
import { TErrorSources, TGenericErrorsResponse } from "../interfaces/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorsResponse => {
  const statusCode = 400;

  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    }
  );

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleValidationError;
