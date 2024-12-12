import { TErrorSources } from "./../interfaces/error";
import mongoose from "mongoose";
import { TGenericErrorsResponse } from "../interfaces/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorsResponse => {
  const statusCode = 400;
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode,
    message: "Invalid ID",
    errorSources,
  };
};

export default handleCastError;
