import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
// import { EmployeeComponent } from '../pages/employee/employee.component';
import { EmployeesComponent } from "./employees/employees.component";
import { EmployeeEditComponent } from "./employee-edit/employee-edit.component";
import { EmployeeAddComponent } from "./employee-add/employee-add.component";
import { EmployeeFlightComponent } from "./employee-flight/employee-flight.component";
import { HotelBookingComponent } from "../pages/hotel-booking/hotel-booking.component";
import { EmployeeCabBookingComponent } from "./employee-cab-booking/employee-cab-booking.component";
import { EmployeeExpenseComponent } from "./employee-expense/employee-expense.component";
import { EmployeeMovementOfGoodsComponent } from "./employee-movement-of-goods/employee-movement-of-goods.component";
import { EmployeeMovementOfVehicleComponent } from "./employee-movement-of-vehicle/employee-movement-of-vehicle.component";
import { EmployeeHotelComponent } from "./employee-hotel/employee-hotel.component";
import { HotelDetailAdminComponent } from "./employee-hotel/hotel-detail-admin/hotel-detail-admin.component";
import { CabDetailAdminComponent } from "./employee-cab-booking/cab-detail-admin/cab-detail-admin.component";
import { ReimbursementsDetailsAdminComponent } from "./employee-expense/reimbursements-details-admin/reimbursements-details-admin.component";
import { MogDetailsAdminComponent } from "./employee-movement-of-goods/mog-details-admin/mog-details-admin.component";
import { MovDetailAdminComponent } from "./employee-movement-of-vehicle/mov-detail-admin/mov-detail-admin.component";
import { AdminVendorViewComponent } from "./admin-vendor-view/admin-vendor-view.component";
import { AdminProcessorViewComponent } from "./admin-processor-view/admin-processor-view.component";
import { ViewProcessorDetailsComponent } from "./admin-processor-view/view-processor-details/view-processor-details.component";
import { ViewVendorDetailsComponent } from "./admin-vendor-view/view-vendor-details/view-vendor-details.component";
import { FightDetailAdminComponent } from "./employee-flight/fight-detail-admin/fight-detail-admin.component";
import { AddVendorComponent } from "./admin-vendor-view/add-vendor/add-vendor.component";
import { AddProcessorComponent } from "./admin-processor-view/add-processor/add-processor.component";
import { EscalationAdminComponent } from './escalation-admin/escalation-admin.component';

// import { ApproveFlightAdminComponent } from './employee-flight/approve/-flight-admin/approve-flight-admin.component';

const routes: Routes = [
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent
  },
  {
    path: "employees",
    component: EmployeesComponent
  },
  {
    path: "addEmpolyee",
    component: EmployeeAddComponent
  },
  {
    path: "addVendor",
    component: AddVendorComponent
  },
  {
    path: "addProcessor",
    component: AddProcessorComponent
  },
  {
    path: "view/:id",
    component: EmployeeEditComponent
  },
  {
    path: "flight-bookin",
    component: EmployeeFlightComponent
  },
  {
    path: "hotel-bookin",
    component: EmployeeHotelComponent
  },
  {
    path: "cab-booking",
    component: EmployeeCabBookingComponent
  },
  {
    path: "expense-reimbersements",
    component: EmployeeExpenseComponent
  },
  {
    path: "movement-goods",
    component: EmployeeMovementOfGoodsComponent
  },
  {
    path: "movement-Vehicles",
    component: EmployeeMovementOfVehicleComponent
  },
  {
    path: "Detail-Flight_admin/:id",
    component: FightDetailAdminComponent
  },
  {
    path: "Detail-Hotel_admin/:id",
    component: HotelDetailAdminComponent
  },
  {
    path: "Detail-Cab_admin/:id",
    component: CabDetailAdminComponent
  },
  {
    path: "Detail-mog_admin/:id",
    component: MogDetailsAdminComponent
  },
  {
    path: "Detail-mov_admin/:id",
    component: MovDetailAdminComponent
  },
  {
    path: "Detail-Reimbursment_admin/:id",
    component: ReimbursementsDetailsAdminComponent
  },
  {
    path: "VendorView",
    component: AdminVendorViewComponent
  },
  {
    path: "ProcessorView",
    component: AdminProcessorViewComponent
  },
  {
    path: "ViewDetailsVendor",
    component: ViewVendorDetailsComponent
  },
  {
    path: "ViewDetailsProcessor/:id",
    component: ViewProcessorDetailsComponent
  },
 
  {
    path: "escalation-admin",
    component: EscalationAdminComponent
  },

  {
    path: "",
    redirectTo: "employees",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminpagesRountingModule {}
