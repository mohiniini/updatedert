import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RequestsVendorComponent } from './requests-vendor/requests-vendor.component';
import { FlightBookingVendorComponent } from './flight-booking-vendor/flight-booking-vendor.component';
import { HotelBookingVendorComponent } from './hotel-booking-vendor/hotel-booking-vendor.component';
import { CabBookingVendorComponent } from './cab-booking-vendor/cab-booking-vendor.component';
import { MovVendorComponent } from './mov-vendor/mov-vendor.component';
import { MogVendorComponent } from './mog-vendor/mog-vendor.component';
import { CabDetailVendorComponent } from './cab-booking-vendor/cab-detail-vendor/cab-detail-vendor.component';
import { FlightDetailVendorComponent } from './flight-booking-vendor/flight-detail-vendor/flight-detail-vendor.component';
import { HotelDetailVendorComponent } from './hotel-booking-vendor/hotel-detail-vendor/hotel-detail-vendor.component';
import { MogDetailVendorComponent } from './mog-vendor/mog-detail-vendor/mog-detail-vendor.component';
import { MovDetailVendorComponent } from './mov-vendor/mov-detail-vendor/mov-detail-vendor.component';


export const routes: Routes = [
  {
    path: "request-list",
    component: RequestsVendorComponent
  },
  {
    path: "flight-booking",
    component: FlightBookingVendorComponent
  },
  {
    path: "hotel-booking",
    component: HotelBookingVendorComponent
  },
  {
    path: "cab-booking",
    component: CabBookingVendorComponent
  },
  {
    path: "mov",
    component: MovVendorComponent
  },
  {
    path: "mog",
    component: MogVendorComponent
  },
  
 { path: "cabViewProcessor/:id",
  component: CabDetailVendorComponent
},

{
  path: "flightViewProcessor/:id",
  component: FlightDetailVendorComponent
},
{
  path: "hotelViewProcessor/:id",
  component: HotelDetailVendorComponent
},
{
  path: "mogViewProcessor/:id",
  component: MogDetailVendorComponent
},
{
  path: "movViewProcessor/:id",
  component: MovDetailVendorComponent
},
{
    path: "",
    redirectTo: "request-list",
    pathMatch: "full"
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorPagesRoutingModule { }
