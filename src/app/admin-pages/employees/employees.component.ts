import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { url } from "./../../../model/url";
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private spinner:NgxSpinnerService,private toast:ToastrService,private http:HttpService,private _location: Location) { }
  backClicked() {
    this._location.back();
  }
  un=undefined;
  page = 1;
  pageSize=5;
  collectionSize
  url=new url();
  employees:any[]=[];
  employeesData:any=[];
  processorList;
 
  // assign:any[]=[];
  save(item,index){
    if (item.data.processorId!==undefined) {
      this.spinner.show()
      console.log(item._id);
    item.data.assign=true;
    // item.data.service={
    //   flightBooking:false,
    //   hotelBooking:false,
    //   cabBooking:false,
    //   expenseRiembursements:false,
    //   goodsMovement:false,
    //   vehicleMovement:false,
    //   escalation:false,
    // }
    // let index=this.processorList.indexOf(item);
    
    console.log(index);
    this.http.updateEmployee(item).subscribe(data=>{
      console.log("success");
      console.log(data,"updated data");
      this.toast.success("Processor Assigned")
      this.reloadEmployee()
      
      
    },err=>{
      this.toast.error("failed")
      this.spinner.hide()
    })
    } else {
      this.toast.warning("select processor")
    }
    
    
  }
  softDelete(id){
    this.spinner.show()
    console.log(id);
    let arr=this.displayEmployee.filter(x=>x._id==id)
    console.log(arr);
    
    let employees=arr[0]
    console.log(employees);
    
    employees.data.softdelete=true
    console.log(employees);
    
    this.http.updateEmployee(employees).subscribe(data => {
      console.log("succesfully update");
      this.toast.info("employees deleted");
      this.reloadEmployee()

      
    });
    
  }
  displayEmployee=[]

  Searchfilter(event){
    console.log(event);
    console.log(this.employees);
    this.displayEmployee=this.employees.filter(x=>x.data.Person_Full_Name_First_Last.toLowerCase().includes(event.toLowerCase())||x.data.Person_Start_Date.toString().includes(event.toString())||x.data.Person_phone_no.toString().includes(event.toString()))
    console.log(this.displayEmployee);
    this.collectionSize=this.displayEmployee.length
  }
  reloadEmployee(){
    this.http.getAllEmployees().subscribe(data=>{
      this.employeesData=data.map((x)=>{ return x.data});
      this.employees=data;
      this.collectionSize=this.employees.length
      this.displayEmployee=this.employees
        
      console.log(this.employeesData);
      
      console.log(this.employees);
      this.spinner.hide()
      
    })
  }
  
 
  ngOnInit() {
    // this.http.getmethod(this.url.baseurl + "employees").then((res: any) => {
    //   this.employees=res
    //   // this.collectionSize = this.employees.length
    //   // this.collectionSize=this.employees.length
    //   console.log(this.employees,"employees");
      
      
    // });
    // ---------------------------------
    this.loadData()

  }
  loadData(){
    // this.http.getmethod(this.url.baseurl + "employees").then((res: any) => {
    //   this.employees=res
    //   // this.collectionSize = this.employees.length
    //   // this.collectionSize=this.employees.length
    //   console.log(this.employees,"employees");
      
      
    // });
    // ---------------------------------
    this.spinner.show()
    this.http.getAllEmployees().subscribe(data=>{
      this.employeesData=data.map((x)=>{ return x.data});
      this.employees=data;
      this.collectionSize=this.employees.length
      this.displayEmployee=this.employees
      console.log(this.employeesData);
      
      console.log(this.employees);
      this.http.getAllProcessor().subscribe(data=>{
        this.processorList=data;
        console.log(this.processorList,"processorLists");
        this.spinner.hide()
        
        
      },err=>{
        this.toast.error("api error")
        this.spinner.hide()
      })
      
    },err=>{
      this.toast.error("api error")
        this.spinner.hide()
    })

    // --------------------------------------------
    

  }
  
}
