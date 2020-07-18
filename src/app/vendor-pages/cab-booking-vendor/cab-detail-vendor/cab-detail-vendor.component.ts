import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cab-detail-vendor',
  templateUrl: './cab-detail-vendor.component.html',
  styleUrls: ['./cab-detail-vendor.component.css']
})
export class CabDetailVendorComponent implements OnInit {
  constructor(
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router,
    private calendar: NgbCalendar,
    private _location: Location,
    private toast:ToastrService
  ) {}
 // model: NgbDateStruct;
 model;
 mode;
  date: {year: number, month: number};
//  time = {hour: 13, minute: 30};
  cdmeridian = false;

  
  id = {
    requestId: ""
  };

  backClicked() {
    this._location.back();
  }


 
  /*dateValidation(model){
    let doj=this.dateofjoining.split('/').reverse();
  // let doj=localStorage.getItem('day');
    let futuredate=new Date();
   futuredate.setFullYear(parseInt(doj[0]),parseInt(doj[1])-1,parseInt(doj[2]))
  
    
    let today=new Date();
   
    //  futuredate.setFullYear(model.year,model.month-1,model.day)
    console.log(futuredate,'futuredate');
  
    console.log(today,"today")

      if (futuredate > today) {
        return true
        console.log('selected date is correct')
      } else {
        // this.toast.warning("Selected date must be less than or greater than 90 days")
        return false
       alert("please select date before the today's date")
  
      }      
    } */
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
    airline: "",
    time: "",
    origination: "",
    destionation: "" ,
    
    price: ""
  };

   origination;
   destionation;
   price;
  fileinputflag;

  hiddenvalue=false
  ngOnInit() {
    //this.destionation = new FormControl("");
    //this.origination = new FormControl("");
   // this.price=new FormControl("");

   // this.price = new FormControl("");
    this.aroute.params.subscribe((params: Params) => {
      this.id.requestId = params["id"];
      console.log(this.id, "params id");
      this.loadContentOfRequest();
    });
  }
  dateofjoining;
  loadContentOfRequest() {
    this.http.getRequestById(this.id).subscribe(data => {
      this.request = data;
      console.log(this.request);
      this.dateofjoining=this.request.users.data.Person_Start_Date
      // this.request.data.sendQuotation = 'not send';
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
      this.router.navigate(["../../cab-booking"], {
        relativeTo: this.aroute
      });
    });
  }
  sendTheQuotation(f) 
  {
    console.log(f);
    

    console.log("enter sendTheQuotation");
    
  //  console.log(this.origination.valid + "this.location.valid")
   // console.log(this.destionation.valid + "this.destionation.valid")
   // console.log(this.price.valid + "this.price.valid")

    
    console.log("enter validation");
    if(f.valid)
    {
    this.request.data.qoutation = this.FlightQuotation;
    this.request.data.qoutation.origination = this.origination;
    this.request.data.qoutation.destionation = this.destionation;
   this.request.data.qoutation.price = this.price;

    this.request.data.qoutation.day=this.model;
   this.request.data.qoutation.time=this.mode;
    this.request.data.sendQuotation = 'send';

    if (this.formRemark.message !== "") {
      this.request.data.remark = [];
      this.request.data.remark.unshift(this.formRemark);
    }
    console.log(this.request,"ajay");
    
   this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully Quotation send");
      this.loadContentOfRequest();
      this.router.navigate(["../../cab-booking"], {
        relativeTo: this.aroute
      });
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

    // this.request.data.=
    if(this.fileinputflag!==undefined)
    {
      this.request.data.status = "green";
      this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully post voucher");
      this.loadContentOfRequest();
      this.router.navigate(["../../flight-booking"], {
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
      this.router.navigate(["../../flight-booking"], {
        relativeTo: this.aroute
      });
    });

  }
}