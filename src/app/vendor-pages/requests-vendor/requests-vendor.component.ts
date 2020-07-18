import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-requests-vendor',
  templateUrl: './requests-vendor.component.html',
  styleUrls: ['./requests-vendor.component.css']
})
export class RequestsVendorComponent implements OnInit {

  constructor(private api:HttpService) { }

  vendor
  ngOnInit() {
    let id={id:localStorage.getItem('userid')}
    this.api.getEmployeeDetail(id).subscribe(data=>{
      this.vendor=data[0]
      console.log(this.vendor);
      
    })
      
  }

}
