import { Dayjs } from "dayjs";

export interface Employee {
  idNumber: string;
  idExpirationDate: Dayjs;
  name: string;
  nationality: string;
  passportNumber: string;
  passportExpirationDate: Dayjs;
  sponsor: string;
  workIn: string;
  agreementExpirationDate: Dayjs;
  status: "duty" | "vacation" | "cancelled";
  licenseExpirationDate: Dayjs;
  licenseType: "Car" | "Truck" | "Car&Truck";
}
