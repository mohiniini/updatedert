import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RouterModule } from "@angular/router";
import { pageRoute } from "./pages-routing.module";
import { EmployeeComponent } from "./employee/employee.component";
import { EmployeeprofileComponent } from "./employeeprofile/employeeprofile.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccommodationComponent } from "./accommodation/accommodation.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FlightbookingComponent } from "./flightbooking/flightbooking.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { HotelBookingComponent } from "./hotel-booking/hotel-booking.component";
import { UserdetailsComponent } from "./_pagescomponents/userdetails/userdetails.component";
import { EmployeebookingsComponent } from "./employeebookings/employeebookings.component";
import { MovementOfGoodsComponent } from "./movement-of-goods/movement-of-goods.component";
import { MovementOfVehiclesComponent } from "./movement-of-vehicles/movement-of-vehicles.component";
import { ExpenseReimbursementsComponent } from "./expense-reimbursements/expense-reimbursements.component";
import { QueryResolutionComponent } from "./query-resolution/query-resolution.component";
import { GrievancesComponent } from "./grievances/grievances.component";
import { ModalDataComponent } from "./_pagescomponents/modal-data/modal-data.component";
import { LocalCabComponent } from "./local-cab/local-cab.component";
import { EditOrDeleteDepencenceComponent } from './edit-or-delete-depencence/edit-or-delete-depencence.component';
import { NewDependencyComponent } from './new-dependency/new-dependency.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PolicyholderComponent } from './policyholder/policyholder.component';
import { FAQComponent } from './faq/faq.component';
import { ViewticketComponent } from './viewticket/viewticket.component';


@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeComponent,
    EmployeeprofileComponent,
    AccommodationComponent,
    FlightbookingComponent,
    UserdetailsComponent,
    HotelBookingComponent,
    EmployeebookingsComponent,
    MovementOfGoodsComponent,
    MovementOfVehiclesComponent,
    ExpenseReimbursementsComponent,
    QueryResolutionComponent,
    GrievancesComponent,
    ModalDataComponent,
    LocalCabComponent,
    EditOrDeleteDepencenceComponent,
    NewDependencyComponent,
    ViewRequestComponent,
    EditRequestComponent,
    FeedbackComponent,
    PolicyholderComponent,
    FAQComponent,
    ViewticketComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pageRoute),
    FormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class PagesModule {}
