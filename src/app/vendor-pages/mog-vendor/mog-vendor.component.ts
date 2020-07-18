import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-mog-vendor',
  templateUrl: './mog-vendor.component.html',
  styleUrls: ['./mog-vendor.component.css']
})
export class MogVendorComponent implements OnInit {

  constructor(private http: HttpService,private _location: Location ) {}
  backClicked() {
    this._location.back();
  }
  request: any = [];
  page = 1;
  pageSize = 5;
  collectionSize;
  
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
      || x.data.detail.pickupcity.toLowerCase().includes(event.toLowerCase())
      || x.data.detail.deliveryadd.toLowerCase().includes(event.toLowerCase())
      // || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
      || this.datefilter(x.data.detail.dateofmovement , event)
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
      this.request = data["Goods Movement"];
      console.log(this.request);
      this.displayRequest = this.request.reverse()
      this.collectionSize=this.displayRequest.length
    });
  }

}
