import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { Location } from '@angular/common';


@Component({
  selector: "app-cab-booking-vendor",
  templateUrl: "./cab-booking-vendor.component.html",
  styleUrls: ["./cab-booking-vendor.component.css"]
})
export class CabBookingVendorComponent implements OnInit {
  constructor(private http: HttpService,private _location: Location ) {}

  backClicked() {
    this._location.back();
  }
  page = 1;
  pageSize = 5;
  collectionSize;
  request: any = [];

  datefilter(obj, event: string) {
    // let splitEvent=event.split('/')
    console.log();
    let dot = obj

    if (dot.includes(event)) {
      return true
    } else {
      return false
    }
  }
  displayRequest = []
  Searchfilter(event) {
    console.log(event);
    console.log(this.request);
    this.displayRequest = this.request.filter(
      x => x.data.name.toLowerCase().includes(event.toLowerCase())
        || x.data.detail.arr.toLowerCase().includes(event.toLowerCase())
        || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
        // || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
        || this.datefilter(x.data.detail.dot, event)
        || x.data.status.toLowerCase().includes(event.toLowerCase())
      // || x.data.priority.toLowerCase().includes(event.toLowerCase())
    )
    console.log(this.displayRequest);
    this.collectionSize = this.request.length
  }

  ngOnInit() {
    let obj = {
      vendorId: localStorage.getItem("userid")
    };
    
    this.http.getRequestByTypeAndVendorId(obj).subscribe(data => {
      this.request = data["Cab Booking"];
      console.log(this.request);
      this.displayRequest = this.request.reverse()
      this.collectionSize = this.displayRequest.length
    });
  }
}
