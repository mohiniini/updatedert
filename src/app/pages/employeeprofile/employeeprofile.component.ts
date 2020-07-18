import { url } from './../../../model/url';
import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { FormsModule, FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: "app-employeeprofile",
  templateUrl: "./employeeprofile.component.html",
  styleUrls: ["./employeeprofile.component.css"]
})
export class EmployeeprofileComponent implements OnInit {
  
  url = new url()
  
  addD: boolean = false;
  private edit: boolean = true;

  //changeEdit() {
    //this.edit = !this.edit;
  //  console.log(this.edit);
  //  }

  edittoggle=true;

  name;
  dob
  relation
  gender
  employee: any = {};
  guest: any = {
    name: '',
    dob: '',
    relation: '',
    gender: ''
  }
  completedetail;
  empdob;
  constructor(private spinner: NgxSpinnerService,private http: HttpService, private api: HttpClient,private _location: Location ,private toast:ToastrService,private router:Router,private aRoute:ActivatedRoute) { }
  bottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  nav(i){
    console.log(i);
    this.router.navigate([`../../employee/editOrDelete/${i}`], {
      relativeTo: this.aRoute
    });
    
  }
  addnewdependency(){
    this.router.navigate([`../../employee/AddDependency`], {
      relativeTo: this.aRoute
    });
  }
  editbuttontoggle(){
    this.edittoggle=false;
  }
  updateDob(){
    this.http.updateEmployee(this.completedetail).subscribe(data => {
      console.log(data);
      this.reload()
      this.edittoggle=true
    })

  }
  phno;

  loadData(){
    this.spinner.show();

    this.name=new FormControl('')
    this.dob=new FormControl('')
    this.relation=new FormControl('')
    this.gender=new FormControl('')


    let id={
      "id": localStorage.getItem("userid")
    }
    this.http.getEmployeeDetail(id).subscribe(data=>{
      console.log(data);
      
      this.employee=data[0].data
      this.completedetail=data[0]
      console.log(this.completedetail);
      console.log(this.completedetail.data.Person_Full_Name_First_Last);
      this.empdob=this.completedetail.data.dob
      console.log(this.empdob);
    this.phno= new FormControl(this.completedetail.data.Person_phone_no)
    this.spinner.hide();

      
    })
  }
  ngOnInit() {
    // this.http
    //   .getmethod(this.url.baseurl+"employees/"+localStorage.getItem("employeeId"))
    //   .then((res: any) => {
    //     this.employee = res
    //   });
    this.loadData()
    
    
  }
  reload(){
    // this.http
    //   .getmethod(this.url.baseurl+"employees/"+localStorage.getItem("employeeId"))
    //   .then((res: any) => {
    //     this.employee = res
    //   });
    

    this.spinner.show();

    let id={
      "id": localStorage.getItem("userid")
    }
    this.http.getEmployeeDetail(id).subscribe(data=>{
      console.log(data);
      
      this.employee=data[0].data
      this.completedetail=data[0]
      console.log(this.completedetail);
      console.log(this.completedetail.data.Person_Full_Name_First_Last);
      this.phno= new FormControl(this.completedetail.data.Person_phone_no)
      this.spinner.hide();

      
      
    })
  }
  backClicked() {
    // this._location.back();
    this.router.navigate([`../../employee`], {
      relativeTo: this.aRoute
    });
  }

  saveEmployee() {

    if (this.name.valid && this.dob.valid && this.gender.valid && this.relation.valid) {

      this.guest.name = this.name.value
      this.guest.dob = this.dob.value
      this.guest.gender = this.gender.value
      this.guest.relation = this.relation.value

      if (this.guest.name!=="" ) 
    {

        if(this.guest.length != 0)
        {
      // this.employee.guests.push(this.guest);
      this.completedetail.data.guests.push(this.guest);




      // this.http.putmethod(this.url.baseurl+localStorage.getItem("employeeId"), JSON.stringify(this.employee)).then((res: any) => {
      //   console.log(res)
      // })
      let id={
        "id": localStorage.getItem("userid")
      }
      console.log(this.employee);
      
      this.http.updateEmployee(this.completedetail).subscribe(data=>{
        console.log(data);
        this.reload()
        
      })
      

      }
      
  }
      

    } else {
        this.toast.warning("please fill valid input")
    }
    


  }

  changeCollapse() {
    this.addD = !this.addD;
  }


  //get my requests
  getRequests() {
      this.http.getmethod('http://127.0.0.1:3000/requests?employee.id=1').then((res:any)=>{
        
      })
  }
  // ============================================================


}
