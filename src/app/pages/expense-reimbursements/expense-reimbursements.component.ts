import { Component, OnInit } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "src/app/services/http/http.service";
import { Router, ActivatedRoute } from "@angular/router";
import { url } from "./../../../model/url";
import { RequestKeygenService } from 'src/app/services/RequestKeygen/request-keygen.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-expense-reimbursements",
  templateUrl: "./expense-reimbursements.component.html",
  styleUrls: ["./expense-reimbursements.component.css"]
})
export class ExpenseReimbursementsComponent implements OnInit {
  heading: boolean = false;
  dependencybody = false;
  url = new url();

  natureOfExpense: any;
 // itemPuschase: any;
  amount: any;
  invoiceNo: any;
  imageSrc: any;

  employee: any = [];

  expense: any = {
    self: true,name:localStorage.getItem("userName"),
    npeople: 0,
    guests: [],
    employeeId : localStorage.getItem("userid"),
    status:"red",
    priority:"low severity / urgent / very urgent",
    ticket:"open",
    type: "Expense Reimbersement",
   
    detail: {
      
      natureofexpense: "",
      itempurschase: "",
      amount: "",
      invoiceno: "",
      invoiceimage: "",
      

      date: Date()
    }
  };

  constructor(
    private calendar: NgbCalendar,
    public http: HttpService,
    private route: Router
    ,private aRoute:ActivatedRoute,
    private key: RequestKeygenService,private _location: Location,
    private toast:ToastrService
  ) {}
  backClicked() {
    this._location.back();
  }

  ngOnInit() {
    //this.itemPuschase = new FormControl("");
    //this.amount = new FormControl("");
   // this.invoiceNo = new FormControl("");
    //this.natureOfExpense = new FormControl("");
    let id={
      "id": localStorage.getItem("userid")
    }
    this.http.getEmployeeDetail(id).subscribe(data=>{
      this.employee=data[0].data
      // this.moveGoods.employee = res;
    });
  }
  saveRequest(f) {
    console.log(f)
   // console.log(this.itemPuschase.valid + "this.itemPuschase.valid")
    console.log(this.amount.valid + "this.amount.valid")
    console.log(this.invoiceNo.valid + "this.voiceNo.valid")
   // if(this.amount.valid && this.invoiceNo.valid )
    //{
      this.expense.requestkey=this.key.expenseReimbersementKeygen();
     this.expense.detail.natureofexpense = this.natureOfExpense;
     //this.expense.detail.itempurschase = this.itemPuschase.value;
     this.expense.detail.amount = this.amount;
     this.expense.detail.invoiceno = this.invoiceNo;
    // this.expense.detail. itempurschase = this.itemPuschase.value;
  
     this.expense.detail.invoiceimage = this.imageSrc;
  
         console.log(JSON.stringify(this.expense));
      // this.http
      //   .postmethod(this.url.baseurl + "requests/", JSON.stringify(this.expense))
      //   .then((res: any) => {
      //     console.log(res);
  
      //     this.route.navigate(["../../employee/bookings"], {
      //       relativeTo: this.aRoute
      //     });
      //   });
      // this.route.navigate(['bookings'])
     // if(this.expense.detail.invoiceimage )
      this.http.postRequest(this.expense).subscribe(data=>{
        console.log(data);
        this.route.navigate(["../../employee/bookings"], {
          relativeTo: this.aRoute
        }); 
        this.toast.success("success")
      },error=>{
        this.toast.error("failed")
      })









      
    // }
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
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
                }



}
