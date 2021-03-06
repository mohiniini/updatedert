import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-fight-detail-admin',
  templateUrl: './fight-detail-admin.component.html',
  styleUrls: ['./fight-detail-admin.component.css']
})
export class FightDetailAdminComponent implements OnInit {

  constructor(
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private toast :ToastrService,
    private spinner:NgxSpinnerService

  ) {}

  id = {
    requestId: ""
  };
  backClicked() {
    this._location.back();
  }
  request;
  seprateremark = {
    message: "",
    role: localStorage.getItem("role"),
    vendordId: localStorage.getItem("userid"),
    time: new Date()
  };
  item=[];
  ngOnInit() {
    this.aroute.params.subscribe((params: Params) => {
      this.id.requestId = params["id"];
      console.log(this.id, "params id");
      this.loadContentOfRequest();
    });
  }
  loadContentOfRequest() {
    this.http.getRequestById(this.id).subscribe(data => {
      this.request = data;this.item=[];
      this.item.push(data.data)
      console.log(this.request,"request");
      console.log(this.item);
      console.log(this.item.length);

      
    });
  }
  sendVoucher(){
    this.spinner.show()
    let postdata={
      "id": this.request.users._id,
      "message": "flight ticket",
      "voucher": this.request.data.voucher
      }
      this.http.sendTicketByUserId(postdata).subscribe(data=>{
        console.log(data);
        this.toast.success("ticket send");
        this.spinner.hide()
      })
  }
  decline(){
    if(this.request.data.exceptions){
      this.request.data.exceptions=false
    }
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
      this.router.navigate(["../../flight-bookin"], {
        relativeTo: this.aroute
      });
    });

  }
  AcceptTheOrder() {
    this.request.data.pwcconfirmation=true;
    if(this.request.data.exceptions){
      this.request.data.exceptions=false
    }
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
    this.request.data.detail.dot=this.request.data.modifiedData.dot
    this.request.data.detail.arr=this.request.data.modifiedData.arr
    this.request.data.detail.dep=this.request.data.modifiedData.dep
    this.request.data.npeople=this.request.data.modifiedData.npeople
    this.request.data.guests=this.request.data.modifiedData.guest
    this.request.data.detail.tot=this.request.data.modifiedData.tot
    this.request.data.detail.meal=this.request.data.modifiedData.meal

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

