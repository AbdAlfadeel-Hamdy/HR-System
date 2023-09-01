import { Schema, model } from "mongoose";
import { EMPLOYEE_STATUS, LICENSE_TYPE } from "../utils/constants.js";

const employeeSchema = new Schema(
  {
    name: String,
    nationality: String,
    idNumber: Number,
    idExpirationDate: Date,
    idImage: String,
    passportNumber: String,
    passportExpirationDate: Date,
    passportImage: String,
    sponsor: String,
    workIn: String,
    agreementExpirationDate: Date,
    licenseExpirationDate: Date,
    licenseType: {
      type: String,
      enum: Object.values(LICENSE_TYPE),
    },
    status: {
      type: String,
      enum: Object.values(EMPLOYEE_STATUS),
      default: EMPLOYEE_STATUS.DUTY,
    },
    vacation: {
      leavingDate: Date,
      returnDate: Date,
      expectedReturnDate: Date,
      period: Number,
    },
    cancellationDate: Date,
  },
  {
    timestamps: true,
  }
);

export default model("Employee", employeeSchema);
