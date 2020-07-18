import { EmployeebookingsComponent } from './employeebookings/employeebookings.component';
import { FlightbookingComponent } from './flightbooking/flightbooking.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { EmployeeprofileComponent } from './employeeprofile/employeeprofile.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { HotelBookingComponent } from './hotel-booking/hotel-booking.component';
import { MovementOfGoodsComponent } from './movement-of-goods/movement-of-goods.component';
import { MovementOfVehiclesComponent } from './movement-of-vehicles/movement-of-vehicles.component';
import { ExpenseReimbursementsComponent } from './expense-reimbursements/expense-reimbursements.component';
import { QueryResolutionComponent } from './query-resolution/query-resolution.component';
import { GrievancesComponent } from './grievances/grievances.component';
import { LocalCabComponent } from './local-cab/local-cab.component';
import { EditOrDeleteDepencenceComponent } from './edit-or-delete-depencence/edit-or-delete-depencence.component';
import { NewDependencyComponent } from './new-dependency/new-dependency.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PolicyholderComponent } from './policyholder/policyholder.component';
import { FAQComponent } from './faq/faq.component';
import { ViewticketComponent } from './viewticket/viewticket.component';

export const pageRoute: Routes = [
  
  {
    path: 'dashboard', component: DashboardComponent

  },{
    path:'',redirectTo:'dashboard',pathMatch:'full'
  },
  {
    path: 'employee', component: EmployeeComponent
  }
  ,
  {
    path: 'employee/profile',
    component: EmployeeprofileComponent
  },
  {
    path:'employee/flightbooking',
    component:FlightbookingComponent

  },
  {
    path:'employee/hotelbooking',
    component:HotelBookingComponent

  },
  {
    path:'employee/bookings',
    component:EmployeebookingsComponent

  },
  {
    path:'employee/movementgood',
    component:MovementOfGoodsComponent

  },
  {
    path:'employee/movementvehicle',
    component:MovementOfVehiclesComponent

  },
  {
    path:'employee/expenseReimbursements',
    component:ExpenseReimbursementsComponent

  },
  {
    path:'employee/queryResolution',
    component:QueryResolutionComponent

  },
  {
    path:'employee/grievances',
    component:GrievancesComponent

  },{
    path:'employee/cabbooking',
    component:LocalCabComponent

  },
  {
    path:'employee/editOrDelete/:id',
    component:EditOrDeleteDepencenceComponent

  },
  {
    path:'employee/AddDependency',
    component:NewDependencyComponent

  },
  {
    path:'employee/requestId/:id',
    component:ViewRequestComponent

  },
  {
    path:'employee/editrequestId/:id',
    component:EditRequestComponent

  },
  {
    path:'employee/feedback/:id',
    component:FeedbackComponent

  },
  {
    path:'employee/policyholder',
    component:PolicyholderComponent

  },
  {
    path:'employee/faq',
    component:FAQComponent

  },
  // {
  //   path:'employee/viewticket/:id',
  //   component: ViewticketComponent
  // }
];

