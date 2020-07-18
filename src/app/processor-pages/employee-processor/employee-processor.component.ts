import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-employee-processor',
  templateUrl: './employee-processor.component.html',
  styleUrls: ['./employee-processor.component.css']
})
export class EmployeeProcessorComponent implements OnInit {

  constructor(private api:HttpService,private location: Location) { }
  backClicked() {
    this.location.back();
  }

  employeeList;
  page = 1;
  pageSize=5;
  collectionSize

  displayEmployee=[]
  Searchfilter(event){
    console.log(event);
    console.log(this.employeeList);
    this.displayEmployee=this.employeeList.filter(x=>
      x.data.Person_Full_Name_First_Last.toLowerCase().includes(event.toLowerCase())||
      x.data.email.toLowerCase().includes(event.toLowerCase())||
      x.data.Person_Start_Date.toString().includes(event.toString())||
      x.data.Person_phone_no.toString().includes(event.toString())
      )
    console.log(this.displayEmployee);
    this.collectionSize=this.displayEmployee.length
  }

  ngOnInit() {

    // this.api.getEmployeeByProcessorIdObservable(localStorage.getItem('processorId')).subscribe(data=>{
    //   this.employeeList=data;
    //   console.log(this.employeeList);
      
    // })
    let user={
      "processorId": localStorage.getItem('userid')
      }
    this.api.getEmployeeUnderProcessor(user).subscribe(data => {
      console.log(data);
      this.employeeList=data;
      this.collectionSize=this.employeeList.length
      this.displayEmployee=this.employeeList
    });
  }

}
