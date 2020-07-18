import { url } from './../../../model/url';
import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { FormsModule, FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-dependency',
  templateUrl: './new-dependency.component.html',
  styleUrls: ['./new-dependency.component.css']
})
export class NewDependencyComponent implements OnInit {

  constructor(private http: HttpService, private api: HttpClient,private _location: Location ,private toast:ToastrService,private router:Router,private aRoute:ActivatedRoute) { }
  
  employee;
  completedetail;
  guest=[];
  newName;
  newDob;
  newRelation;
  newGender :string = "";
 // reason1;
  backClicked(){
    this._location.back()
  }
  reload(){
    let id={
      "id": localStorage.getItem("userid")
    }
    this.http.getEmployeeDetail(id).subscribe(data=>{
      console.log(data);
      
      this.employee=data[0].data
      this.completedetail=data[0]
      console.log(this.completedetail);
      console.log(this.completedetail.data.Person_Full_Name_First_Last);
      this.guest=this.completedetail.data.guests
      console.log(this.guest);    
    })
  }


  checkvalue(newDob)
  {
    if(this.dateValidation(newDob))
    {
      
    }
    else{
     
      this.toast.warning("Please select date less than today's date")
      
    }
  }


    
dateValidation(newDob){

let futuredate=new Date(newDob);


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

  // minDate = new Date(1900, 0, 1);
  // maxDate =  new Date(new Date().setDate(new Date().getDate()-1))

  saveNewDependency(f){
    console.log(f);
    let obj={
      name:this.newName,
      gender:this.newGender,
      relation:this.newRelation,
      dob:this.newDob
    }
    console.log(obj);
    if (f.valid) {
      // this.toast.success("valid")
      this.guest.push(obj);


      this.completedetail.data.guests=this.guest
      console.log(this.completedetail);
      
      this.http.updateEmployee(this.completedetail).subscribe(data => {
        console.log(data);
        this.router.navigate([`../../employee/profile`], {
          relativeTo: this.aRoute
        });
      })
      
      
      

    } else {
      this.toast.warning("Fill Complete Details")
    }
    
    
  }

  ngOnInit() {
    this.reload()
  }

}
