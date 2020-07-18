import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeProcessorComponent } from "./employee-processor/employee-processor.component";
import { VendorTabProcessorComponent } from './vendor-tab-processor/vendor-tab-processor.component';
import { FlightBookingProcessorComponent } from './flight-booking-processor/flight-booking-processor.component';
import { CabBookingProcessorComponent } from './cab-booking-processor/cab-booking-processor.component';
import { MogProcessorComponent } from './mog-processor/mog-processor.component';
import { MovProcessorComponent } from './mov-processor/mov-processor.component';
import { QueryComponent } from './query/query.component';
import { ExpeneseProcessorComponent } from './expenese-processor/expenese-processor.component';
import { HotelBookingProcessorComponent } from './hotel-booking-processor/hotel-booking-processor.component';
import { WelcomeProcessorComponent } from './welcome-processor/welcome-processor.component';
import { ViewEmployeeComponent } from './employee-processor/view-employee/view-employee.component';
import { CabViewProcessorComponent } from './cab-booking-processor/cab-view-processor/cab-view-processor.component';
import { ExpenseViewProcessorComponent } from './expenese-processor/expense-view-processor/expense-view-processor.component';
import { FlightViewProcessorComponent } from './flight-booking-processor/flight-view-processor/flight-view-processor.component';
import { HotelViewProcessorComponent } from './hotel-booking-processor/hotel-view-processor/hotel-view-processor.component';
import { MogViewProcessorComponent } from './mog-processor/mog-view-processor/mog-view-processor.component';
import { MovViewProcessorComponent } from './mov-processor/mov-view-processor/mov-view-processor.component';

export const routes: Routes = [
  {
    path: "employee-list",
    component: EmployeeProcessorComponent
  },
  {
    path: "vendor-list",
    component: VendorTabProcessorComponent
  },
  {
    path: "flight-booking",
    component: FlightBookingProcessorComponent
  },
  {
    path: "hotel-booking",
    component: HotelBookingProcessorComponent
  },
  {
    path: "cab-booking",
    component: CabBookingProcessorComponent
  },
  {
    path: "mog",
    component: MogProcessorComponent
  },
  {
    path: "mov",
    component: MovProcessorComponent
  },
  {
    path: "escalation",
    component: QueryComponent
  },
  {
    path: "expense",
    component: ExpeneseProcessorComponent
  },
  {
    path: "welcome",
    component: WelcomeProcessorComponent
  },
  {
    path: "view/:id",
    component: ViewEmployeeComponent
  },
  {
    path: "cabViewProcessor/:id",
    component: CabViewProcessorComponent
  },
  {
    path: "expenseViewProcessor/:id",
    component: ExpenseViewProcessorComponent
  },
  {
    path: "flightViewProcessor/:id",
    component: FlightViewProcessorComponent
  },
  {
    path: "hotelViewProcessor/:id",
    component: HotelViewProcessorComponent
  },
  {
    path: "mogViewProcessor/:id",
    component: MogViewProcessorComponent
  },
  {
    path: "movViewProcessor/:id",
    component: MovViewProcessorComponent
  },
  

  
  {
    path: "",
    redirectTo: "welcome",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessorPagesRoutingModule {}
