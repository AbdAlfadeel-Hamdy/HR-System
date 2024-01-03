import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import {
  EMPLOYEE_STATUS,
  LICENSE_TYPE,
  USER_ROLES,
} from "../utils/constants.js";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        throw new BadRequestError(errorMessages.join(" "));
      }
      next();
    },
  ];
};

export const validateEmployeeInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required."),
  // body("nationality").notEmpty().withMessage("Nationality is required."),
  body("idNumber").notEmpty().withMessage("ID number is required."),
  // body("idExpirationDate")
  //   .notEmpty()
  //   .withMessage("ID expiration date is required."),
  // body("passportNumber").notEmpty().withMessage("Passport number is required."),
  // body("passportExpirationDate")
  //   .notEmpty()
  //   .withMessage("Passport expiration date is required."),
  // body("sponsor").notEmpty().withMessage("Sponsor is required."),
  // body("workIn").notEmpty().withMessage("Work in place is required."),
  // body("agreementExpirationDate")
  //   .notEmpty()
  //   .withMessage("Agreement expiration date is required."),
  // body("licenseExpirationDate")
  //   .notEmpty()
  //   .withMessage("License expiration date is required."),
  // body("licenseType")
  //   .withMessage("License type is required.")
  //   .isIn(Object.values(LICENSE_TYPE))
  //   .withMessage("Invalid license type."),
  // body("status")
  //   .withMessage("Status is required.")
  //   .isIn(Object.values(EMPLOYEE_STATUS))
  //   .withMessage("Invalid employee status."),
]);

export const validateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("Email already exists.");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format."),
  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("Name is required."),
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email format.")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.id)
        throw new BadRequestError("Email already exists.");
    }),
]);

export const validateVacationInput = withValidationErrors([
  body("idNumber").notEmpty().withMessage("ID number is required."),
  body("employeeName").notEmpty().withMessage("Employee Name is required."),
  body("leavingDate").notEmpty().withMessage("Leaving Date is required."),
  body("expectedReturnDate")
    .notEmpty()
    .withMessage("Expected return date is required."),
]);
