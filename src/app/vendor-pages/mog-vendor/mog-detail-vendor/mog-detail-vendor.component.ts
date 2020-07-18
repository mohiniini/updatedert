import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mog-detail-vendor',
  templateUrl: './mog-detail-vendor.component.html',
  styleUrls: ['./mog-detail-vendor.component.css']
})
export class MogDetailVendorComponent implements OnInit {
  constructor(
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router ,
    private _location: Location,private toast:ToastrService
  ) {}

  model;
  
  id = {
    requestId: ""
  };
  backClicked() {
    this._location.back();
  }

  seprateremark = {
    message: "",
    role: localStorage.getItem("role"),
    vendordId: localStorage.getItem("userid"),
    time: new Date()
  };
  formRemark = {
    message: "",
    role: localStorage.getItem("role"),
    vendordId: localStorage.getItem("userid"),
    time: new Date()
  };
  request;
  orderAceeptance;
  FlightQuotation = {
    
  
    
    price: null
  };
  price;
  fileinputflag;
  hiddenvalue=false
  ngOnInit() {
    //this.price= new FormControl("");
    this.aroute.params.subscribe((data:Params)=>{
      this.id.requestId=data['id']
    })
    this.loadContentOfRequest()
  }
  modificationBlocked=true

  loadContentOfRequest() {
    this.http.getRequestById(this.id).subscribe(data => {
      this.request = data;
      console.log(this.request);
      // this.request.data.sendQuotation = 'not send';
      if (this.request.data.modificationExceptions==true) {
        this.modificationBlocked=false;
        this.toast.warning("Kindly wait as the Modified Booking details are being reviewed.")
      }

      if(this.request.data.sendQuotation =="send"){
        this.hiddenvalue=true;
      }
    });
  }

  checkvalue(model)
  {
    if(this.dateValidation(model))
    {
      
    }
    else{
     
      this.toast.warning("Please select date greater than today's date")
      
    }
  }


    
dateValidation(model){

let futuredate=new Date(model);


let today=new Date();

console.log(futuredate,'futuredate');

console.log(today,"today")

let DifferenceToday_In_Days= Math.floor((Date.UTC(futuredate.getFullYear(), futuredate.getMonth(), futuredate.getDate())-Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));

console.log(DifferenceToday_In_Days);


if (DifferenceToday_In_Days>-1 ) {
  return true  
} else {
  // this.toast.warning("Date should be present")
  return false
}

}
  AcceptTheOrder() {
    this.request.data.orderConfirmed = true;
    this.request.data.sendQuotation = 'waiting';
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully Accepted");
      this.loadContentOfRequest();
    });
  }
  DeclineTheOrder() {
    // delete this.request.data.orderConfirmed ;
    delete this.request.data.vendorId;
    delete this.request.data.assignVendor;
    this.request.data.status = "red";
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully declined");
      this.router.navigate(["../../mog"], {
        relativeTo: this.aroute
      });
    });
  }
  sendTheQuotation(f) {
   // console.log(this.price.valid,"this.price.valid");
    console.log(f);
    
      if(f.valid)
      {
      this.request.data.qoutation = this.FlightQuotation;
    this.request.data.qoutation.day=this.model
    this.request.data.sendQuotation = 'send';
   this.FlightQuotation.price=  this.price;

    if (this.formRemark.message !== "") {
      this.request.data.remark = [];
      this.request.data.remark.unshift(this.formRemark);
    }
    console.log(this.request);
    
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully Quotation send");
      this.loadContentOfRequest();
    });
   }
  }
  
  postremark(){
    let a =this.seprateremark;
    this.request.data.remark.unshift(a);
    console.log(this.request);
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully post remark");
      this.seprateremark.message="";
      this.loadContentOfRequest();
    });
    
  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.fileinputflag = reader.result;
    this.request.data.voucher = reader.result;
    console.log(this.request.data.voucher);
  }
  sendTheVoucher(){
   // console.log(this.price.valid + "this.price.valid")
    if(this.fileinputflag!==undefined)
    {
      console.log("upload ticket");
      
    this.request.data.status = "green";
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully post voucher");
      this.loadContentOfRequest();
     this.router.navigate(["../../mog"], {
        relativeTo: this.aroute
                    });
             });
    }




  }
  
  decline(){
    delete this.request.data.vendorId;
    delete this.request.data.assignVendor;
    this.request.data.status = "red";
    if(this.request.data.voucher){
      delete this.request.data.voucher;
      
    }
    delete this.request.data.remark;
    delete this.request.data.qoutation;
    delete this.request.data.sendQuotation;
    delete this.request.data.orderConfirmed;
    if (this.request.data.pwcconfirmation) {
      delete this.request.data.pwcconfirmation
    }
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully declined");
      this.router.navigate(["../../mog"], {
        relativeTo: this.aroute
      });
    });

  }
}
