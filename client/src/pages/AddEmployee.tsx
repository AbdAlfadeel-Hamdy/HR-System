import { EmployeeForm } from "../components";

const AddEmployee = () => {
  return (
    <EmployeeForm
      url="/employees"
      method="POST"
      initialValues={{
        idNumber: "",
        idExpirationDate: null,
        name: "",
        nationality: "",
        passportNumber: "",
        passportExpirationDate: null,
        sponsor: "",
        workIn: "",
        agreementExpirationDate: null,
        status: "duty",
        licenseExpirationDate: null,
        licenseType: null,
      }}
    />
  );
};

export default AddEmployee;
