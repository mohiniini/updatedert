import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-vendor-view',
  templateUrl: './admin-vendor-view.component.html',
  styleUrls: ['./admin-vendor-view.component.css']
})
export class AdminVendorViewComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,private toast:ToastrService,private http:HttpService,private _location: Location,private router:Router,private aroute:ActivatedRoute) { }
  vendor:any[]=[];
  page = 1;
  pageSize = 5;
  collectionSize;
  backClicked() {
    this._location.back();
  }

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
    this.displayVendor = this.vendor.filter(x => x.data.email.toLowerCase().includes(event.toLowerCase()) ||
      x.data.name.toLowerCase().includes(event.toLowerCase()) ||
      this.domainFilter(x.data.domain,event)||
      x.data.phone_no.toString().includes(event.toString())
    )
    console.log(this.displayVendor);
    this.collectionSize=this.displayVendor.length
  }
  softDelete(id){
    this.spinner.show()
    console.log(id);
    let arr=this.displayVendor.filter(x=>x._id==id)
    let vendor=arr[0]
    vendor.data.softdelete=true
    this.http.updateEmployee(vendor).subscribe(data => {
      console.log("succesfully update");
      this.toast.info("vendor deleted");
      this.reloadData()

      
    });
    
  }

  ngOnInit() {
    this.spinner.show()
    this.http.getAllVendor().subscribe(res=>{
      this.vendor=res;
      this.collectionSize=this.vendor.filter(x=>x.data.softdelete==false).length
      this.displayVendor=this.vendor.filter(x=>x.data.softdelete==false)
      console.log(this.displayVendor);
      this.spinner.hide()

          

    } )    
  }

  reloadData(){
    // this.spinner.show()
    this.http.getAllVendor().subscribe(res=>{
      this.vendor=res;
      this.collectionSize=this.vendor.filter(x=>x.data.softdelete==false).length
      this.displayVendor=this.vendor.filter(x=>x.data.softdelete==false)
      console.log(this.displayVendor);
      this.spinner.hide()

          

    } )
  }
  
}
//vendor hai