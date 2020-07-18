import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminpagesRountingModule } from "./adminpages-rounting.module";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { EmployeesComponent } from "./employees/employees.component";
import { EmployeeEditComponent } from "./employee-edit/employee-edit.component";
import { EmployeeAddComponent } from "./employee-add/employee-add.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EmployeeFlightComponent } from "./employee-flight/employee-flight.component";
import { EmployeeHotelComponent } from "./employee-hotel/employee-hotel.component";
import { EmployeeMovementOfGoodsComponent } from "./employee-movement-of-goods/employee-movement-of-goods.component";
import { EmployeeMovementOfVehicleComponent } from "./employee-movement-of-vehicle/employee-movement-of-vehicle.component";
import { EmployeeCabBookingComponent } from "./employee-cab-booking/employee-cab-booking.component";
import { MaterialModule } from "../material.module";
// import { ApproveFlightAdminComponent } from './employee-flight/approve-flight-admin/approve-flight-admin.component';
import { EmployeeExpenseComponent } from "./employee-expense/employee-expense.component";
import { HotelDetailAdminComponent } from "./employee-hotel/hotel-detail-admin/hotel-detail-admin.component";
import { CabDetailAdminComponent } from "./employee-cab-booking/cab-detail-admin/cab-detail-admin.component";
import { ReimbursementsDetailsAdminComponent } from "./employee-expense/reimbursements-details-admin/reimbursements-details-admin.component";
import { MogDetailsAdminComponent } from "./employee-movement-of-goods/mog-details-admin/mog-details-admin.component";
import { MovDetailAdminComponent } from "./employee-movement-of-vehicle/mov-detail-admin/mov-detail-admin.component";
import { AdminVendorViewComponent } from "./admin-vendor-view/admin-vendor-view.component";
import { AdminProcessorViewComponent } from "./admin-processor-view/admin-processor-view.component";
import { ViewProcessorDetailsComponent } from "./admin-processor-view/view-processor-details/view-processor-details.component";
import { ViewVendorDetailsComponent } from "./admin-vendor-view/view-vendor-details/view-vendor-details.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { FightDetailAdminComponent } from "./employee-flight/fight-detail-admin/fight-detail-admin.component";
import { AddVendorComponent } from "./admin-vendor-view/add-vendor/add-vendor.component";
import { AddProcessorComponent } from "./admin-processor-view/add-processor/add-processor.component";
import { AdminQueryComponent } from './admin-query/admin-query.component';
import { EscalationAdminComponent } from './escalation-admin/escalation-admin.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    EmployeesComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    EmployeeFlightComponent,
    EmployeeHotelComponent,
    EmployeeMovementOfGoodsComponent,
    EmployeeMovementOfVehicleComponent,
    EmployeeExpenseComponent,
    EmployeeCabBookingComponent,
    HotelDetailAdminComponent,
    CabDetailAdminComponent,
    ReimbursementsDetailsAdminComponent,
    MogDetailsAdminComponent,
    MovDetailAdminComponent,
    AdminVendorViewComponent,
    AdminProcessorViewComponent,
    ViewProcessorDetailsComponent,
    ViewVendorDetailsComponent,
    FightDetailAdminComponent,
    AddVendorComponent,
    AddProcessorComponent,
    AdminQueryComponent,
    EscalationAdminComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    AdminpagesRountingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class AdminPagesModule {}
