import { Dayjs } from "dayjs";

export interface Employee {
  idNumber: string;
  idExpirationDate: Dayjs | null;
  name: string;
  nationality: string;
  passportNumber: string;
  passportExpirationDate: Dayjs | null;
  sponsor: string;
  workIn: string;
  agreementExpirationDate: Dayjs | null;
  status: "duty" | "vacation" | "cancelled";
  licenseExpirationDate: Dayjs | null;
  licenseType: "Car" | "Truck" | "Car&Truck" | null;
  note?: string;
}
