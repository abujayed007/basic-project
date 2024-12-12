import mongoose from "mongoose";
import { TErrorSources, TGenericErrorsResponse } from "../interfaces/error";

export const handleDuplicateError = (err: any): TGenericErrorsResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: "",
      message: `${extractedMessage} already exists`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate Error",
    errorSources,
  };
};
