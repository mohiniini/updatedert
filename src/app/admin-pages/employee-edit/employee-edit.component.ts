import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from "src/app/services/http/http.service";
import { ActivatedRoute, Params, Route, Router } from "@angular/router";
import { url } from "../../../model/url";
import { ToastrService } from "ngx-toastr";
import { Location } from '@angular/common';

@Component({
  selector: "app-employee-edit",
  templateUrl: "./employee-edit.component.html",
  styleUrls: ["./employee-edit.component.css"]
})
export class EmployeeEditComponent implements OnInit {
  url = new url();

  private edit: boolean = true;
  changeEdit() {
    this.edit = !this.edit;
    console.log(this.edit);
  }

  emp = {
    _id: "",
    role: "",
    data: {
      Requisition_Company_Code: "",
      Requisition_Company_Country: "",
      Primary_Location_Country_Full_Name: "",
      Offer_Intake_Global_Job_Location_City: "",
      Requisition_Requisition_ID: "",
      Requisition_Position_Number: "",
      Primary_Recruiter_Full_Name_First_Last: "",
      Person_Folder_Status: "New Hire",
      Person_Full_Name_First_Last: "",
      email: "",
      Person_phone_no: "",
      Offer_Intake_Global_Telephone: "",
      Requisition_Cost_Center_Code: "",
      Offer_Intake_Global_Hiring_Manager: "",
      Offer_Intake_Global_Hiring_Manager_Alias: "",
      Offer_Intake_Global_ReportsToManager: "",
      Offer_Intake_Global_ReportsToManagerAlias: "",
      Offer_Intake_Global_Relocation_Needed: "",
      Offer_Intake_Global_Relocation_Type: "",
      Offer_Intake_Global_Relocation_Tier: "",
      Offer_Intake_Global_Relocation_Summary: "",
      Offer_Intake_Global_Tentative_Start_Date: "",
      First_Offer_Offer_Accepted: "",
      Status: "",
      Offer_Intake_Global_Form_Status_Offer_Intake_Global: "",
      Requisition_First_Placed_in_Status_Pre_Onboard_Hire_Complete: "",
      Person_Start_Date: "",
      guests: []
    }
  };
  // emp={
  //   id:"",
  //   Requisition_Company_Code: "",
  //   Requisition_Company_Country: "",
  //   Primary_Location_Country_Full_Name: "",
  //   Offer_Intake_Global_Job_Location_City: "",
  //   Requisition_Requisition_ID: "",
  //   Requisition_Position_Number: "",
  //   Primary_Recruiter_Full_Name_First_Last: "",
  //   Person_Folder_Status: "New Hire",
  //   Person_Full_Name_First_Last: "",
  //   Person_Email_Address: "",
  //   Person_phone_no: "",
  //   Offer_Intake_Global_Telephone: "",
  //   Requisition_Cost_Center_Code:"" ,
  //   Offer_Intake_Global_Hiring_Manager: "",
  //   Offer_Intake_Global_Hiring_Manager_Alias: "",
  //   Offer_Intake_Global_ReportsToManager: "",
  //   Offer_Intake_Global_ReportsToManagerAlias: "",
  //   Offer_Intake_Global_Relocation_Needed: "",
  //   Offer_Intake_Global_Relocation_Type: "",
  //   Offer_Intake_Global_Relocation_Tier: "",
  //   Offer_Intake_Global_Relocation_Summary: "",
  //   Offer_Intake_Global_Tentative_Start_Date: "",
  //   First_Offer_Offer_Accepted: "",
  //   Status: "",
  //   Offer_Intake_Global_Form_Status_Offer_Intake_Global: "",
  //   Requisition_First_Placed_in_Status_Pre_Onboard_Hire_Complete: "",
  //   Person_Start_Date: "",
  //   guests:[]
  // }
  user = { id: "" };
  constructor(
    private http: HttpClient,
    private api: HttpService,
    
    private toastr: ToastrService,
    private aroute: ActivatedRoute,
    private router: Router,private _location: Location
  ) {}

 backClicked() {
  this._location.back();
}

  ngOnInit() {
    this.aroute.params.subscribe((params: Params) => {
      this.user.id = params["id"];
      console.log(this.user.id);
    }),
      this.api.getEmployeeDetail({ id: this.user.id }).subscribe(res => {
        this.emp = res[0];
        console.log(this.emp, "employees");
      });
  }
  save() {
    // this.http
    //   .put<any>(this.url.baseurl + "employees/" + this.emp._id, this.emp, {
    //     headers: new HttpHeaders({
    //       "Content-Type": "application/json"
    //     })
    //   })
    //   .subscribe(data => {
    //     console.log(data);

    //     this.toastr.success("Success", "Data Inserted", {
    //       progressBar: true
    //     });

    //     this.router.navigate(["..P/../employees"], { relativeTo: this.aroute });
    //   });

    // ====================================
    this.api.updateEmployee(this.emp).subscribe(data => {
      console.log("succesfully update");
      this.router.navigate(["../../employees"], { relativeTo: this.aroute });
    });
  }
}
