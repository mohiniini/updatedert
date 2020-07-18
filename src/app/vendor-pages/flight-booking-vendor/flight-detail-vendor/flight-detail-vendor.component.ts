import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-flight-detail-vendor",
  templateUrl: "./flight-detail-vendor.component.html",
  styleUrls: ["./flight-detail-vendor.component.css"]
})
export class FlightDetailVendorComponent implements OnInit {
  constructor(
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router ,
    private _location: Location,private toast:ToastrService
  ) {}

  city = ["Bangalore", "Mumbai", " New Delhi", "Hyderabad", "Bhubaneswar" ,"Jaipur", "Guwahati" , "Varanasi" ,"Tiruchirappalli","Lucknow" ,"Kolkata"  ,"Gwalior"  ,"Indore" ,"Chennai","Pune", "Bhopal","Kerala","Ahmedabad","Kochi"];
  city1 = ["Bangalore", "Mumbai", " New Delhi", "Hyderabad", "Bhubaneswar" ,"Jaipur", "Guwahati" , "Varanasi" ,"Tiruchirappalli","Lucknow" ,"Kolkata"  ,"Gwalior"  ,"Indore" ,"Chennai","Pune", "Bhopal","Kerala","Ahmedabad","Kochi"];


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
    message: null,
    role: localStorage.getItem("role"),
    vendordId: localStorage.getItem("userid"),
    time: new Date()
  };
  request;
  orderAceeptance;
  FlightQuotation = {
    date:"",
    airline: "",
    time: "",
    origination: "",
    destionation: "",
    price: ""
  };
  model
  date: {year: number, month: number};
  airline;
  origination;
  destionation;
  price;
  fileinputflag;

  hiddenvalue=false

  modificationBlocked=true

  ngOnInit() {

    //this.airline= new FormControl("");
    //this.origination = new FormControl("");
    //this.destionation = new FormControl("");
    //this.price= new FormControl("");
   // this.formRemark.message = new FormControl("");

    this.aroute.params.subscribe((params: Params) => {
      this.id.requestId = params["id"];
      console.log(this.id, "params id");
      this.loadContentOfRequest();
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
  loadContentOfRequest() {
    this.http.getRequestById(this.id).subscribe(data => {
      this.request = data;
      console.log(this.request);
      if (this.request.data.modificationExceptions==true) {
        this.modificationBlocked=false;
        this.toast.warning("Kindly wait as the Modified Booking details are being reviewed. ")
      }
      if(this.request.data.sendQuotation =="send"){
        this.hiddenvalue=true;
      }
    });
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
      this.router.navigate(["../../flight-booking"], {
        relativeTo: this.aroute
      });
    });
  }
  sendTheQuotation(f) {
    console.log(f)


   // console.log(this.price.valid + "this.price.valid")
   // console.log(this.formRemark.message.valid + "this.formRemark.message.valid")


    if(f.valid)
    {
    this.FlightQuotation.date=this.model
    this.FlightQuotation.airline= this.airline;
    this.FlightQuotation.origination= this.origination;
    this.FlightQuotation.destionation= this.destionation;
    this.FlightQuotation.price=  this.price;
   // this.FlightQuotation.formRemark.message =  this.FlightQuotation.formRemark.message.value;



    this.request.data.qoutation = this.FlightQuotation;

    this.request.data.sendQuotation =  'send';
    
   
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

   
    if(this.fileinputflag!==undefined){
      this.request.data.status = "green";
     // alert("chal gaya bhai")
       this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully post voucher");
      this.loadContentOfRequest();
      this.router.navigate(['../../flight-booking'],{relativeTo:this.aroute})

   });

    }
    else{
      alert("please upload file")

    }
 
    // this.http.updateRequest(this.request).subscribe(data => {
      // console.log("succesfully post voucher");
      // this.loadContentOfRequest();
      // this.router.navigate(['../../flight-booking'],{relativeTo:this.aroute})

  //  });


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
      this.router.navigate(["../../flight-booking"], {
        relativeTo: this.aroute
      });
    });

  }
}
