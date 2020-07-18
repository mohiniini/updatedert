import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotel-view-processor',
  templateUrl: './hotel-view-processor.component.html',
  styleUrls: ['./hotel-view-processor.component.css']
})
export class HotelViewProcessorComponent implements OnInit {

  constructor(
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toast:ToastrService
  ) {}
  backClicked() {
    this.location.back();
  }

  id = {
    requestId: ""
  };
  request;
  seprateremark = {
    message: "",
    role: localStorage.getItem("role"),
    vendordId: localStorage.getItem("userid"),
    time: new Date()
  };


  exceptionToggle=false;
  qoutationToggle=false;
  exceptionAlert=false;
  AcceptDeclineToogle=true;

  un=undefined;

  exception(){
    this.request.data.exceptions=true;
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully Accepted");
      this.loadContentOfRequest();
    });
  }

  exceptionchecker(request){
    console.log(request,"request for exception");
    if(request.data.qoutation!==undefined){
      this.qoutationToggle=true;
      
      var text = request.data.qoutation.price ;
      var pointNum = parseFloat(text);
      if (request.data.pwcconfirmation) {
        this.AcceptDeclineToogle=false
      }
      
      if (request.data.exceptions==true) {
        // this.qoutationToggle=false
        this.exceptionToggle=true;
        this.exceptionAlert=true;
        
        
      }
    }
    
  }

  ngOnInit() {
    this.aroute.params.subscribe((params: Params) => {
      this.id.requestId = params["id"];
      console.log(this.id, "params id");
      this.loadContentOfRequest();
    });
  }
  loadContentOfRequest() {
    this.http.getRequestById(this.id).subscribe(data => {
      this.request = data;
      console.log(this.request);
      this.exceptionchecker(this.request)

    });
  }
  sendVoucher(){
    let postdata={
      "id": this.request.users._id,
      "message": "hotel booking ticket",
      "voucher": this.request.data.voucher
      }
      this.http.sendTicketByUserId(postdata).subscribe(data=>{
        console.log(data);
        this.toast.success("ticket send")
      })
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
  AcceptTheOrder() {
    this.request.data.pwcconfirmation=true;
    
    // this.request.data.orderConfirmed = true;
    // this.request.data.sendQuotation = 'waiting';
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully Accepted");
      this.loadContentOfRequest();
    });
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
  declineModification(){
    // common for everyone
    delete this.request.data.modifiedData;
    delete this.request.data.modificationExceptions
    this.request.data.modification="decline";
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully Accepted");
      this.toast.info("modification decline")
      this.loadContentOfRequest();
    });
    
  }
  AcceptModification(){
    this.request.data.modification="accepted";
// =========================================================================
    this.request.data.detail.startDate=this.request.data.modifiedData.startDate
    this.request.data.detail.endDate=this.request.data.modifiedData.endDate
    this.request.data.detail.location=this.request.data.modifiedData.location
    this.request.data.npeople=this.request.data.modifiedData.npeople
    this.request.data.guests=this.request.data.modifiedData.guest
    this.request.data.detail.noroooms=this.request.data.modifiedData.noroooms
    this.request.data.detail.splitAccomodation=this.request.data.modifiedData.splitAccomodation
    this.request.data.detail.reasonvalue=this.request.data.modifiedData.reasonforsplit


// ========================================================================
    delete this.request.data.modifiedData
    delete this.request.data.modificationExceptions

    this.http.updateRequest(this.request).subscribe(data => {
      console.log("succesfully Accepted");
      this.toast.success("modification accepted")
      this.loadContentOfRequest();
    });

  }


}
