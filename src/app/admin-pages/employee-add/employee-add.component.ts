import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";

import { HttpClient } from '@angular/common/http';
//import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { url } from "../../../model/url";
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
//import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  styleUrls: ["./employee-add.component.css"]
})

export class EmployeeAddComponent implements OnInit {
  model: NgbDateStruct = this.calendar.getToday();;
  model1: NgbDateStruct = this.calendar.getToday();;
  // model;
  // model1;
  model2;
  undef = undefined;
  // model2: NgbDateStruct;
  url = new url();
  emp = {
    role: "employee",
    Requisition_Company_Code: "",
    Requisition_Company_Country: '',
    Primary_Location_Country_Full_Name: '',
    Offer_Intake_Global_Job_Location_City: '',
    Requisition_Requisition_ID: '',
    Requisition_Position_Number: '',
    Primary_Recruiter_Full_Name_First_Last: '',
    Person_Folder_Status: "New Hire",
    Person_Full_Name_First_Last: '',
    email: '',
    Person_phone_no: '',
    Offer_Intake_Global_Telephone: '',
    Requisition_Cost_Center_Code: '',
    Offer_Intake_Global_Hiring_Manager: '',
    Offer_Intake_Global_Hiring_Manager_Alias: '',
    Offer_Intake_Global_ReportsToManager: '',
    Offer_Intake_Global_ReportsToManagerAlias: '',
    Offer_Intake_Global_Relocation_Needed: '',
    Offer_Intake_Global_Relocation_Type: '',
    Offer_Intake_Global_Relocation_Tier: '',
    Offer_Intake_Global_Relocation_Summary: '',
    Offer_Intake_Global_Tentative_Start_Date: '',
    First_Offer_Offer_Accepted: '',
    Status: '',
    Offer_Intake_Global_Form_Status_Offer_Intake_Global: '',
    Requisition_First_Placed_in_Status_Pre_Onboard_Hire_Complete: '',
    dob: '',
    nationality: '',
    entity: '',
    // Date_Of_Joining : null,
    // Joining_Location :null,

    joininglocation: '',
    Person_Start_Date: '',
    guests: [],
    firstTime: true,
    service: {},
    "softdelete": false




  };
  processorList

  ngOnInit() {
    this.api.getAllProcessor().subscribe(data => {
      this.processorList = data;
      console.log(this.processorList, "processorLists");
      this.spinner.hide()


    }, err => {
      this.toastr.error("api error unable to fetch processor")
      this.spinner.hide()
    })
  }


  // ================================================================
  selectedFile;
  fileupload(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    // this.upload()
  }
  serviesCheck = {
    flightBooking: false,
    hotelBooking: false,
    cabBooking: false,
    expenseRiembursements: false,
    goodsMovement: false,
    vehicleMovement: false,
    escalation: false,
  }
  flbooking = false;
  htbooking = false;
  logservice() {
    console.log(this.serviesCheck);

  }

  processorId;
  updateEmployee: any;
  async upload() {
    // await loader.present()
    if (this.selectedFile != null) {
      this.spinner.show()
      const fd = new FormData();
      fd.append("sampleFile", this.selectedFile);
      console.log(fd);
      let st: string = "as"
      st.toLocaleLowerCase()

      this.api.uploadResource(fd).subscribe((res: any) => {
        if (res != null) {
          this.toastr.success("File Uploaded!");

          console.log(res);
          for (let index = 1; index < res.Sheet1.length; index++) {
            const element = res.Sheet1[index];
            let obj = {
              role: "employee",
              Requisition_Company_Code: element.B,
              Requisition_Company_Country: element.C,
              Primary_Location_Country_Full_Name: element.D,
              Offer_Intake_Global_Job_Location_City: element.E,
              Requisition_Requisition_ID: element.F,
              Requisition_Position_Number: element.G,
              Primary_Recruiter_Full_Name_First_Last: element.H,
              Person_Folder_Status: element.I,
              Person_Full_Name_First_Last: element.J,
              email: element.K.toLowerCase(),
              Person_phone_no: element.L,
              Offer_Intake_Global_Telephone: element.M,
              Requisition_Cost_Center_Code: element.N,
              Offer_Intake_Global_Hiring_Manager: element.O,
              Offer_Intake_Global_Hiring_Manager_Alias: element.P,
              Offer_Intake_Global_ReportsToManager: element.Q,
              Offer_Intake_Global_ReportsToManagerAlias: element.R,
              Offer_Intake_Global_Relocation_Needed: element.S,
              Offer_Intake_Global_Relocation_Type: element.T,
              Offer_Intake_Global_Relocation_Tier: element.U,
              Offer_Intake_Global_Relocation_Summary: element.V,
              Offer_Intake_Global_Tentative_Start_Date: element.W.slice(0, 10).split('-').reverse().join('/'),
              First_Offer_Offer_Accepted: element.X,
              Status: element.Y,
              Offer_Intake_Global_Form_Status_Offer_Intake_Global: element.Z,
              Requisition_First_Placed_in_Status_Pre_Onboard_Hire_Complete: element.AA.slice(0, 10).split('-').reverse().join('/'),
              Person_Start_Date: element.AB.slice(0, 10).split('-').reverse().join('/'),
              dob: element.AC.slice(0, 10).split('-').reverse().join('/'),
              nationality: element.AD,
              entity: element.AE,
              firstTime: true,
              service: {
                flightBooking: true,
                hotelBooking: true,
                cabBooking: true,
                expenseRiembursements: true,
                goodsMovement: true,
                vehicleMovement: true,
                escalation: true,
              },
              processorId: this.processorId,
              "softdelete": false,
              //  Date_Of_Joining: element.AF.slice(0,10).split('-').reverse().join('/'),
              joininglocation: element.AF,
              guests: []
            };
            this.api.postNewEmployee(obj).subscribe(data => {
              let x=data;
              console.log(typeof x);
              console.log(x);
              
              
              
              if (data.status == true) {
                let postData = {
                  email: obj.email,
                  name: obj.Person_Full_Name_First_Last
                }
                this.api.WelcomeByMail(postData).subscribe(data => {
                  console.log(data);

                })
                console.log("successfully saved");
                console.log(`(index) ${index}=${res.Sheet1.length} (lenght)`);
              } else {
                this.updateEmployee = data.doc;
                this.updateEmployee.data = obj;
                this.api.updateEmployee(this.updateEmployee).subscribe(data => {
                  console.log("succesfully update");
                  // this.selectedFile = undefined;
                  // this.router.navigate(["../../employees"], { relativeTo: this.aroute });
                });

              }

            });


          }
          this.toastr.success("Employee Added");
          this.spinner.hide()
          // let resourceid = res.resourceId;
          // this.selectedFile = undefined;
          // this.resoursename = undefined;
          console.log(res);


          // this.toastr = res.Resourse;
          // console.log(this.resouseArray);
          // this.resourceUpdate(this.resouseArray);
          // console.log(this.resouseDetailArray);

          // loader.dismiss()
        } else {
          this.toastr.warning("Error in file upload");

          // loader.dismiss()
        }
      }, err => {
        this.spinner.hide()
        this.toastr.error("Error")
      });
    } else {

      this.toastr.warning("Please Select A File to Upload");
    }
  }
  // ==========================================================================
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private api: HttpService,
    private aroute: ActivatedRoute,
    private calendar: NgbCalendar,
    private router: Router, private location: Location,
    private spinner: NgxSpinnerService,
    private toast:ToastrService

  ) { }

  backClicked() {
    this.location.back();
  }


  selectToday() {
    this.model = this.calendar.getToday();
  }

  checkvalue(model2)
  {
    if(this.dateValidation(model2))
    {
      
    }
    else{
     
      this.toast.warning("Please select date less than today's date")
      
    }
  }

  checkvalue1(model1)
  {
    if(this.dateValidationn(model1))
    {
      
    }
    else{
     
      this.toast.warning("Please select date greater than today's date")
      
    }
  }

  checkvalue2(model)
  {
    if(this.dateValidationn(model))
    {
      
    }
    else{
     
      this.toast.warning("Please select date greater than today's date")
      
    }
  }


    
dateValidation(model2){

let futuredate=new Date(model2);


let today=new Date();

console.log(futuredate,'futuredate');

console.log(today,"today")

let DifferenceToday_In_Days= Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())-Date.UTC(futuredate.getFullYear(),futuredate.getMonth(), futuredate.getDate())) / (1000 * 60 * 60 * 24));

console.log(DifferenceToday_In_Days);


if (DifferenceToday_In_Days>-1 ) {
  return true  
} else {
  // this.toast.warning("Date should be present")
  return false
}

}

dateValidationnn(model){

  let futuredate=new Date(model);
  
  
  let today=new Date();
  
  console.log(futuredate,'futuredate');
  
  console.log(today,"today")
  
  let DifferenceToday_In_Days= Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())-Date.UTC(futuredate.getFullYear(),futuredate.getMonth(), futuredate.getDate())) / (1000 * 60 * 60 * 24));
  
  console.log(DifferenceToday_In_Days);
  
  
  if (DifferenceToday_In_Days>-1 ) {
    return true  
  } else {
    // this.toast.warning("Date should be present")
    return false
  }
  
  }

dateValidationn(model1){

  let futuredate=new Date(model1);
  
  
  let today=new Date();
  
  console.log(futuredate,'futuredate');
  
  console.log(today,"today")
  
  let DifferenceToday_In_Days= Math.floor((Date.UTC(futuredate.getFullYear(), futuredate.getMonth(),futuredate.getDate())-Date.UTC(today.getFullYear(),today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));
  
  console.log(DifferenceToday_In_Days);
  
  
  if (DifferenceToday_In_Days>-1 ) {
    return true  
  } else {
    // this.toast.warning("Date should be present")
    return false
  }
  
  }
  
  
  




  

  save(f) {
    console.log(f)
    this.spinner.show()

    console.log(this.emp);
    this.emp.Person_Full_Name_First_Last = this.emp.Person_Full_Name_First_Last;
    this.emp.email = this.emp.email.toLowerCase();
    this.emp.nationality = this.emp.nationality;
    this.emp.entity = this.emp.entity;
    this.emp.joininglocation = this.emp.joininglocation;
    this.emp.Person_phone_no = this.emp.Person_phone_no;


    this.emp.Person_Start_Date = "" + this.model.day + "/" + this.model.month + "/" + this.model.year + ""
    this.emp.Offer_Intake_Global_Tentative_Start_Date = "" + this.model1.day + "/" + this.model1.month + "/" + this.model1.year + ""
    this.emp.dob = "" + this.model2.day + "/" + this.model2.month + "/" + this.model2.year + ""

    this.emp.Offer_Intake_Global_Tentative_Start_Date = "" + this.model1.day + "/" + this.model1.month + "/" + this.model1.year + "";
    this.emp.service = this.serviesCheck
    this.api.postNewEmployee(this.emp).subscribe(data => {
      console.log("successfully saved");
      this.spinner.hide();
      if (data.status == true) {
        let postData = {
          email: this.emp.email,
          name: this.emp.Person_Full_Name_First_Last
        }
        this.api.WelcomeByMail(postData).subscribe(data => {
          console.log(data);
          console.log("successfully saved");

          this.router.navigate(["../employees"], { relativeTo: this.aroute });
        })
      }else{
        this.toastr.warning("this user already exist please use different email")
      }
      
    }, err => {
      this.spinner.hide();
      this.toastr.error("api error")
    });
  }
}
