import React from 'react';

export const LoginPage = React.lazy(() => import('./LoginPage'));
export const ErrorPage = React.lazy(() => import('./ErrorPage'));
export const Dashboard = React.lazy(() => import('./Dashboard'));
export const CancelledReport = React.lazy(() => import('./CancelledReport'));
export const ActivityLogReport = React.lazy(
  () => import('./ActivityLogReport')
);
export const DriverReport = React.lazy(() => import('./DriverReport'));
export const Employees = React.lazy(() => import('./Employees'));
export const PassportReport = React.lazy(() => import('./PassportReport'));
export const IdRenewalReport = React.lazy(() => import('./IdRenewalReport'));
export const ExpiredIdReport = React.lazy(() => import('./ExpiredIdReport'));
export const OnDutyReport = React.lazy(() => import('./OnDutyReport'));
export const OnVacationReport = React.lazy(() => import('./OnVacationReport'));
export const AddEmployee = React.lazy(() => import('./AddEmployee'));
export const AddUser = React.lazy(() => import('./AddUser'));
export const EmployeeDetails = React.lazy(() => import('./EmployeeDetails'));
export const SponsorReport = React.lazy(() => import('./SponsorReport'));
export const Users = React.lazy(() => import('./Users'));
