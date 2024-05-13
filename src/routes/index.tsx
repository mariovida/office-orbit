import React, { Suspense, lazy } from "react";
import type { RouteObject } from "react-router";
import { Outlet } from "react-router-dom";

import ProtectedRoute from "./protected-routes";

import { Layout as DashboardLayout } from "@src/layouts";
import HomePage from "@src/pages";
// import PatientsPage from "@src/pages/patients/Patients";
// import AddNewPatientPage from "@src/pages/patients/AddNewPatient";
// import PatientRecordsPage from "@src/pages/patients/PatientRecords";
// import DoctorsPage from "@src/pages/doctors/Doctors";
// import AddNewDoctorPage from "@src/pages/doctors/AddNewDoctor";
// import InvoicesPage from "@src/pages/invoices/Invoices";
// import AddNewInvoicePage from "@src/pages/invoices/AddNewInvoice";
// import InvoiceDetailsPage from "@src/pages/invoices/InvoiceDetails";
// import AppointmentsPage from "@src/pages/appointments/Appointments";
// import AddNewAppointmentPage from "@src/pages/appointments/AddNewAppointment";
// import RecordsPage from "@src/pages/records/Records";

const LoginPage = lazy(() => import("@src/pages/auth/login"));

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];
