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

var contactperson = ["rahul", "rohan", "ajay", "mukul", "mayank"];

@Component({
  selector: "app-movement-of-goods",
  templateUrl: "./movement-of-goods.component.html",
  styleUrls: ["./movement-of-goods.component.css"]
})
export class MovementOfGoodsComponent implements OnInit {
  dependencybody = false;
  moveGoods: any = {
    self: true,name:localStorage.getItem("userName"),
    npeople: 0,
    employeeId :  localStorage.getItem("userid"),
    status:"red",
    priority:"low severity / urgent / very urgent",
    ticket:"open",
    guests: [],
   


    type: "Goods Movement",
    detail: {
      
      dateofmovement: "",
      pickupcity: "",
     // pickupadd: "",
      deliveryadd: "",
      contactperson: "",
      contactpersonemail :"",
      contactpersonphone : "" ,
      pickupcityreason : "",
      deliverycityreason : "",
      requirementsofstorage: false,

      date: Date()
    }
  };
  public  reason1 : any;

  public  reason2 : any;
  //public depModel: any;
  pickUpCity: string = '';
  deliveryAdd: string ='';

  //pickUpCity: any = "others";
 // pickUpAdd: any;
 // deliveryAdd: any;
  contactPerson: any;
  contactPersonemail :any;
  contactPersonphone : any;
  pickupcityReason : any;
  deliverycityReason : any;
  //requirementsOfStorage: any = false;
  requirementsOfStorage: any;

  url = new url();

  city = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune" ,"Jaipur", "Agra" , "Kanpur", "Varanasi" ,"Kerala","Lucknow" ,"Kolkata" ,"Kota" ,"Ludhiyana" ,"Indore" ,"Noida" ,"Gurgaon" ,"Surat","Jabalpur" ,"Gwalior" ,"Faridabad" ,"Amritsar" ,"Chennai","Chandigarh", "Bhopal","Ajmer","Allahabad","Patna","Others"];
  city1 = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune" ,"Jaipur", "Agra" , "Kanpur", "Varanasi" ,"Kerala","Lucknow" ,"Kolkata" ,"Kota" ,"Ludhiyana" ,"Indore" ,"Noida" ,"Gurgaon" ,"Surat","Jabalpur" ,"Gwalior" ,"Faridabad" ,"Amritsar" ,"Chennai","Chandigarh", "Bhopal","Ajmer","Allahabad","Patna","Others"];

  heading: boolean = false;
model
 // model: NgbDateStruct= this.calendar.getToday();
  date: { year: number; month: number };

  employee: any = [];

  constructor(
    private calendar: NgbCalendar,
    public http: HttpService,
    private route: Router,
    private aRoute: ActivatedRoute
    ,private key: RequestKeygenService,private _location: Location,
    private toast:ToastrService,private spinner:NgxSpinnerService
  ) {}

  

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

  changeDate1(model){
    if (this.dateValidation(model)) {
      
    } else {
      this.toast.warning("Selected date should -3 to 90 days from start date ")
    }
  
  }




  backClicked() {
    this._location.back();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? []
          : contactperson
              .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  ngOnInit() {
    //  this.pickUpAdd = new FormControl("");
 //  this.deliveryAdd = new FormControl("");
   // this.contactPersonemail = new FormControl("");
   // this.requirementsOfStorage = new FormControl("");
   // this.pickUpCity = new FormControl("");
   // this.contactPerson = new FormControl("");
    let id={
      "id": localStorage.getItem("userid")
    }
    // this.http.getEmployeeDetail(id).subscribe(data=>{
    //   this.employee=data[0].data
    //   console.log(this.employee);
      
    //   // this.moveGoods.employee = res;
    // });
    this.loadData()

    
    
  }
  requestData
  mogShow=true
  showScreen=false;
  
  loadData(){
    this.spinner.show();
    let id = {
      "userid": localStorage.getItem('userid')
    }
    this.http.getRequestByEmployeeId(id).subscribe(data => {
      this.requestData = data;
      console.log(this.requestData, "req");
      this.requestData=this.requestData.filter(x=>{
        if(x.type=="Goods Movement"){
          if (x.data.status=="red"||x.data.status=="green"||x.data.status=="yellow"){
            return x
          }
        }
      })
      let noOfRequest=this.requestData.length
      if (noOfRequest==1) {
        this.mogShow=false;
      }
      console.log(this.requestData, "req");
      this.showScreen=true;

      

     
      this.spinner.hide();
      



    })
  }

  saveRequest(f) {
    console.log(f)
  //  console.log(this.pickUpAdd.valid + "this.pickUpAdd.valid")
  //  console.log(this.deliveryAdd.valid + "this.deliveryAdd.valid")
 //  console.log(this.contactPersonemail.valid + "this.contactPersonemail.valid")
    // console.log(this.requirementsOfStorage + "this.requirementsOfStorage.valid")
     //console.log(this.pickUpCity.valid + "this.pickUpCity.valid")
    // console.log(this.contactPerson.valid + "this.contactPerson.valid")
    // console.log(this.contactPersonemail.valid + "this.contactPersonemail.valid")



   // if(this.pickUpAdd.valid && this.deliveryAdd.valid  && this.contactPerson.valid  && this.contactPersonemail.valid)
  //  {
    this.moveGoods.requestkey=this.key.movementOfGoodsKeygen();
    this.moveGoods.detail.dateofmovement = this.model;
    this.moveGoods.detail.pickupcity = this.pickUpCity;
  //  this.moveGoods.detail.pickupadd = this.pickUpAdd;
    this.moveGoods.detail.deliveryadd = this.deliveryAdd;
    this.moveGoods.detail.contactperson = this.contactPerson;
    this.moveGoods.detail.contactpersonemail = this.contactPersonemail;
    this.moveGoods.detail.contactpersonphone = this.contactPersonphone;
    this.moveGoods.detail.requirementsofstorage = this.requirementsOfStorage;
    this.moveGoods.detail.pickupcityreason  = this.pickupcityReason;
    this.moveGoods.detail.deliverycityreason = this.deliverycityReason;

    console.log(JSON.stringify(this.moveGoods));
     
      
   // if (this.dateValidation(this.model)) {
       
      this.http.postRequest(this.moveGoods).subscribe(data => {
        console.log(data);
        console.log(data,"save mog");
        console.log(typeof data);
        let jsonData=JSON.parse(data);
        this.toast.success("success")
        this.route.navigate([`../../employee/feedback/${jsonData.id}`], {
          relativeTo: this.aRoute
        });
        
      }, error => {
        this.toast.error("failed")
      });
    } }
