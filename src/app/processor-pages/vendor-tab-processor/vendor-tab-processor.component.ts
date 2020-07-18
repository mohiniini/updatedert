import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vendor-tab-processor',
  templateUrl: './vendor-tab-processor.component.html',
  styleUrls: ['./vendor-tab-processor.component.css']
})
export class VendorTabProcessorComponent implements OnInit {

  constructor(private http:HttpService,private location: Location) { }
  backClicked() {
    this.location.back();
  }
  vendor:any[]=[];
  page = 1;
  pageSize = 5;
  collectionSize=0 ;
  displayVendor=[]
  domainFilter(x,event){
    let a=x.filter(item=>item.Domain_name.toLowerCase().includes(event.toLowerCase()))
    if (a.length==0) {
      return false
    } else {
      return true
    }
  }
  Searchfilter(event){
    console.log(event);
    console.log(this.vendor);
    this.displayVendor = this.vendor.filter(x => 
      x.data.email.toLowerCase().includes(event.toLowerCase()) ||
      x.data.name.toLowerCase().includes(event.toLowerCase()) ||
      x.data.address.toLowerCase().includes(event.toLowerCase()) ||
      this.domainFilter(x.data.domain,event)||
      x.data.phone_no.toString().includes(event.toString())
    )
    console.log(this.displayVendor);
    this.collectionSize=this.displayVendor.length
  }

  ngOnInit() {

    this.http.getAllVendor().subscribe(res=>{
      this.vendor=res;
      console.log(this.vendor);
      this.collectionSize=this.vendor.length
      this.displayVendor=this.vendor  
      
      // this.collectionSize=this.vendor.length
    } )
  }
  

}
