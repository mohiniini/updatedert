import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VendorPagesRoutingModule } from "./vendor-pages-routing.module";
import { RequestsVendorComponent } from "./requests-vendor/requests-vendor.component";
import { FlightBookingVendorComponent } from "./flight-booking-vendor/flight-booking-vendor.component";
import { HotelBookingVendorComponent } from "./hotel-booking-vendor/hotel-booking-vendor.component";
import { CabBookingVendorComponent } from "./cab-booking-vendor/cab-booking-vendor.component";
import { MogVendorComponent } from "./mog-vendor/mog-vendor.component";
import { MovVendorComponent } from "./mov-vendor/mov-vendor.component";
import { CabDetailVendorComponent } from "./cab-booking-vendor/cab-detail-vendor/cab-detail-vendor.component";
import { FlightDetailVendorComponent } from "./flight-booking-vendor/flight-detail-vendor/flight-detail-vendor.component";
import { HotelDetailVendorComponent } from "./hotel-booking-vendor/hotel-detail-vendor/hotel-detail-vendor.component";
import { MogDetailVendorComponent } from "./mog-vendor/mog-detail-vendor/mog-detail-vendor.component";
import { MovDetailVendorComponent } from "./mov-vendor/mov-detail-vendor/mov-detail-vendor.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    RequestsVendorComponent,
    FlightBookingVendorComponent,
    HotelBookingVendorComponent,
    CabBookingVendorComponent,
    MogVendorComponent,
    MovVendorComponent,
    CabDetailVendorComponent,
    FlightDetailVendorComponent,
    HotelDetailVendorComponent,
    MogDetailVendorComponent,
    MovDetailVendorComponent
  ],
  imports: [
    CommonModule,
    VendorPagesRoutingModule,
    FormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class VendorPagesModule {}
