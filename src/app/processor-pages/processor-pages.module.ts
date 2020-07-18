import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { ProcessorPagesRoutingModule } from './processor-pages-routing.module';
import { EmployeeProcessorComponent } from "./employee-processor/employee-processor.component";
import { ProcessorPagesRoutingModule } from "./processor-pages-routing.module";
import { VendorTabProcessorComponent } from "./vendor-tab-processor/vendor-tab-processor.component";
import { FlightBookingProcessorComponent } from "./flight-booking-processor/flight-booking-processor.component";
import { HotelBookingProcessorComponent } from "./hotel-booking-processor/hotel-booking-processor.component";
import { CabBookingProcessorComponent } from "./cab-booking-processor/cab-booking-processor.component";
import { MogProcessorComponent } from "./mog-processor/mog-processor.component";
import { MovProcessorComponent } from "./mov-processor/mov-processor.component";
import { QueryComponent } from "./query/query.component";
import { ExpeneseProcessorComponent } from "./expenese-processor/expenese-processor.component";
import { WelcomeProcessorComponent } from "./welcome-processor/welcome-processor.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ViewEmployeeComponent } from './employee-processor/view-employee/view-employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FlightViewProcessorComponent } from './flight-booking-processor/flight-view-processor/flight-view-processor.component';
import { HotelViewProcessorComponent } from './hotel-booking-processor/hotel-view-processor/hotel-view-processor.component';
import { MogViewProcessorComponent } from './mog-processor/mog-view-processor/mog-view-processor.component';
import { MovViewProcessorComponent } from './mov-processor/mov-view-processor/mov-view-processor.component';
import { ExpenseViewProcessorComponent } from './expenese-processor/expense-view-processor/expense-view-processor.component';
import { CabViewProcessorComponent } from './cab-booking-processor/cab-view-processor/cab-view-processor.component';

@NgModule({
  declarations: [
    EmployeeProcessorComponent,
    VendorTabProcessorComponent,
    FlightBookingProcessorComponent,
    HotelBookingProcessorComponent,
    CabBookingProcessorComponent,
    MogProcessorComponent,
    MovProcessorComponent,
    QueryComponent,
    ExpeneseProcessorComponent,
    WelcomeProcessorComponent,
    ViewEmployeeComponent,
    FlightViewProcessorComponent,
    HotelViewProcessorComponent,
    MogViewProcessorComponent,
    MovViewProcessorComponent,
    ExpenseViewProcessorComponent,
    CabViewProcessorComponent
  ],
  imports: [
    CommonModule, 
    ProcessorPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class ProcessorPagesModule {}
