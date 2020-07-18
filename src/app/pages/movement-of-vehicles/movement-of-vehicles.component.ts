import { Component, OnInit } from "@angular/core";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { url } from "./../../../model/url";
import { HttpService } from "./../../services/http/http.service";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { Observable, Subject, merge } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { RequestKeygenService } from 'src/app/services/RequestKeygen/request-keygen.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: "app-movement-of-vehicles",
  templateUrl: "./movement-of-vehicles.component.html",
  styleUrls: ["./movement-of-vehicles.component.css"]
})
export class MovementOfVehiclesComponent implements OnInit {
  dependencybody = false;
  constructor(
    private calendar: NgbCalendar,
    public http: HttpService,
    private route: Router,
    private aRoute: ActivatedRoute
    , private key: RequestKeygenService, private _location: Location,
    private toast:ToastrService,private spinner:NgxSpinnerService
  ) { }
  url = new url();
  city = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Jaipur", "Agra", "Kanpur", "Varanasi", "Kerala", "Lucknow", "Kolkata", "Kota", "Ludhiyana", "Indore", "Noida", "Gurgaon", "Surat", "Jabalpur", "Gwalior", "Faridabad", "Amritsar", "Chennai", "Chandigarh", "Bhopal", "Ajmer", "Allahabad", "Patna", "Others"];



  heading: boolean = false;
  model
  //model: NgbDateStruct = this.calendar.getToday();
  date: { year: number; month: number };
  public  reason1 : any;
  //public depModel: any;
  depModel: string = '';

  employee: any = [];

  moveVehicle: any = {
    self: true, name: localStorage.getItem("userName"),
    npeople: 0,
    guests: [],
    employeeId: localStorage.getItem("userid"),
    status: "red",
    priority: "low severity / urgent / very urgent",
    ticket: "open",
    type: "Vehicle Movement",
    detail: {

      origination: "",
      designation: "",
      dateofmovement: "",
      vehicletype: "",
      location: "" ,
      // rtoamount
      // rtoinvoiceNo
      // invoiceimage


      date: Date()
    }
  };
  origination: any;
  designation: any;
  noRto: any;
  Location: any;
  vehicleType: any;
  rtoAmount: any;
  rtoInvoiceNo: any;
  imageSrc: any;
  backClicked() {
    this._location.back();
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }

  changeDate1(model){
    if (this.dateValidation(model)) {
      
    } else {
      this.toast.warning("Selected date should -3 to 90 days from start date ")
    }
  
  }

  dateValidation(model){
    let doj=localStorage.getItem('dateofjoining').split('/').reverse();
    let dojoining=new Date();
    dojoining.setFullYear(parseInt(doj[0]),parseInt(doj[1])-1,parseInt(doj[2]))
  
    let today=new Date();
    let dojourney=new Date(model);
    // dojourney.setFullYear(model.year,model.month-1,model.day)
    console.log(dojoining,'dojoining');
    console.log(dojourney,'dojourney');
    console.log(today,"today")
  
    let DifferenceToday_In_Days= Math.floor((Date.UTC(dojourney.getFullYear(), dojourney.getMonth(), dojourney.getDate())-Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));
    let Difference_In_Days= Math.floor((Date.UTC(dojourney.getFullYear(), dojourney.getMonth(), dojourney.getDate())-Date.UTC(dojoining.getFullYear(), dojoining.getMonth(), dojoining.getDate())) / (1000 * 60 * 60 * 24));
    
    // let Difference_In_Time = dojourney.getTime() -dojoining.getTime() ; 
    // let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    // let DifferenceToday_In_Time =  dojourney.getTime() -today.getTime() ; 
    // let DifferenceToday_In_Days = DifferenceToday_In_Time / (1000 * 3600 * 24);
  
    console.log(Difference_In_Days);
    console.log(DifferenceToday_In_Days);
    let a=Math.round(DifferenceToday_In_Days)
    // if()
  
    if (Difference_In_Days>-4&&DifferenceToday_In_Days>=0 ) {
      if (Difference_In_Days<=90 &&DifferenceToday_In_Days>=0) {
        return true
      } else {
        return false
      }      
    } else {
      return false
    }
    
    
  
  }
  requestData
  mogShow=true
  showScreen=false;
  ShowTwoWheeler=false;
  ShowFourWheeler=false;
  
  loadData(){
    this.spinner.show();
    let id = {
      "userid": localStorage.getItem('userid')
    }
    this.http.getRequestByEmployeeId(id).subscribe(data => {
      this.requestData = data;
      console.log(this.requestData, "req");
      this.requestData=this.requestData.filter(x=>{
        if(x.type=="Vehicle Movement"){
          if (x.data.status=="red"||x.data.status=="green"||x.data.status=="yellow"){
            return x
          }
        }
      })
      let noOfRequestForTwoWheeler=this.requestData.filter(x=>x.data.detail.vehicletype=="Two Wheelers"&&(x.data.status=="red"||x.data.status=="green"||x.data.status=="yellow")).length
      console.log(noOfRequestForTwoWheeler);
      
      let noOfRequestForFourWheeler=this.requestData.filter(x=>x.data.detail.vehicletype=="Four Wheelers"&&(x.data.status=="red"||x.data.status=="green"||x.data.status=="yellow")).length

      if (noOfRequestForFourWheeler==2&&noOfRequestForTwoWheeler==1) {
        this.mogShow=false;
        
      }
      if (noOfRequestForTwoWheeler==1) {
        this.ShowTwoWheeler=true
      }
      if (noOfRequestForFourWheeler==2) {
        this.ShowFourWheeler=true
      }
      console.log(this.requestData, "req");
      this.showScreen=true;

      

     
      this.spinner.hide();
      



    })
  }


  ngOnInit() {
  //  this.origination = new FormControl("");
  //  this.designation = new FormControl("");
    let id = {
      "id": localStorage.getItem("userid")
    }
    // this.http.getEmployeeDetail(id).subscribe(data => {
    //   this.employee = data[0].data
    //   // this.moveGoods.employee = res;
    // });
    this.loadData()
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
  saveRequest(f) {
    console.log(f)
    //console.log(this.origination.valid + "this.origination.valid")
   // console.log(this.designation.valid + "this.designation.valid")
   //if (this.origination.valid && this.designation.valid) {
    if(f.valid &&this.dateValidation(this.model)){

    this.moveVehicle.requestkey = this.key.movementOfVehicleKeygen();
      this.moveVehicle.detail.dateofmovement = this.model;
      this.moveVehicle.detail.origination = this.origination;
      this.moveVehicle.detail.currentlocation = this.depModel;
      this.moveVehicle.detail.designation = this.designation;
      this.moveVehicle.detail.vehicletype = this.vehicleType;
      this.moveVehicle.detail.location = this.Location;
      // this.moveVehicle.detail.rtoamount = this.rtoAmount;
      // this.moveVehicle.detail.rtoinvoiceNo = this.rtoInvoiceNo;
      // this.moveVehicle.detail.invoiceimage = this.imageSrc;

      console.log(JSON.stringify(this.moveVehicle));
      // this.http
      //   .postmethod(
      //     this.url.baseurl + "requests/",
      //     JSON.stringify(this.moveVehicle)
      //   )
      //   .then((res: any) => {
      //     console.log(res);

      //     this.route.navigate(["../../employee/bookings"], {
      //       relativeTo: this.aRoute
      //     });
      //   });
      // this.route.navigate(['bookings'])
      /*this.http.postRequest(this.moveVehicle).subscribe(data=>{
        console.log(data);
        this.route.navigate(["../../employee/bookings"], {
          relativeTo: this.aRoute
                           }); 
                           this.toast.success("success")
                          },error=>{
                            this.toast.error("failed")
                          }) */

     // if (this.dateValidation(this.model)) {
      
        
       this.http.postRequest(this.moveVehicle).subscribe(data => {
          console.log(data);
          console.log(data,"save mov");
          console.log(typeof data);
          let jsonData=JSON.parse(data);
          this.toast.success("success")
          this.route.navigate([`../../employee/feedback/${jsonData.id}`], {
            relativeTo: this.aRoute
          });

        }, error => {
          this.toast.error("failed")
        });
      // } else {
      //   this.toast.warning("invalid input")
      // }
    
    }
    
}
}
