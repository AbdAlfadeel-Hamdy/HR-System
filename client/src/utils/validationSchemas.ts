import * as yup from "yup";

export const vacationValidationSchema = yup.object({
  leavingDate: yup
    .date()
    .required("Leaving Date is required")
    .typeError("Invalid format"),
  expectedReturnDate: yup
    .date()
    .required("Expected Return Date is required")
    .typeError("Invalid format"),
});

export const employeeValidationSchema = yup.object({
  idNumber: yup.string().required("ID Number is required"),
  idExpirationDate: yup
    .date()
    .required("ID Expiration Date is required")
    .typeError("Invalid format"),
  name: yup.string().required("Name is required"),
  nationality: yup.string().required("Nationality is required"),
  passportNumber: yup.string().required("Passport Number is required"),
  passportExpirationDate: yup
    .date()
    .required("Expiration Date is required")
    .typeError("Invalid date format"),
  sponsor: yup.string().required("Sponsor is required"),
  workIn: yup.string().required("Work In is required"),
  agreementExpirationDate: yup
    .date()
    .required("Expiration Date is required")
    .typeError("Invalid format"),
  status: yup
    .string()
    .oneOf(["duty", "vacation", "cancelled"])
    .required("Status is required"),
  licenseExpirationDate: yup.date().required("Expiration Date is required"),
  licenseType: yup
    .string()
    .oneOf(["Car", "Truck", "Car&Truck"])
    .required("License Type is required"),
});

export const createUserValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Name is required"),
  password: yup
    .string()
    .min(8, "Password should be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export const updateUserValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Name is required"),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});
