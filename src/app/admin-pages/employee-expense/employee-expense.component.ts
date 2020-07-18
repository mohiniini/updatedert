import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
//import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-employee-expense',
  templateUrl: './employee-expense.component.html',
  styleUrls: ['./employee-expense.component.css']
})
export class EmployeeExpenseComponent implements OnInit {

  constructor(private toast:ToastrService,private spinner: NgxSpinnerService,private api:HttpService, 
     private _location: Location  
    ) { }

  request;
  vendors:any[]=[];
  page = 1;
  pageSize = 5;
  collectionSize;
  backClicked() {
    this._location.back();
  }
  
  
  save(item,index){
    console.log(item._id);
    // item.data.assignVendor=true;
    item.data.status="green";
    item.data.adminId=localStorage.getItem('userid')
    item.data.ticket = "close";

    // let index=this.processorList.indexOf(item);
    
    console.log(index);
    this.api.updateRequest(item).subscribe(data=>{
      console.log("success");
      console.log(data,"updated data");
      this.reloadEmployee()
      
      
    })
    
    
  }
  displayRequest = []
  Searchfilter(event) {
    console.log(event);
    console.log(this.request);
    this.displayRequest = this.request.filter(
      x => x.data.name.toLowerCase().includes(event.toLowerCase())
      || x.data.detail.natureofexpense.toLowerCase().includes(event.toLowerCase())
      // || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
      || x.data.detail.amount.toString().includes(event)
      // || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
      // || this.datefilter(x.data.detail.dot, event)
      || x.data.status.toLowerCase().includes(event.toLowerCase())
      // || x.data.priority.toLowerCase().includes(event.toLowerCase())
    )
    console.log(this.displayRequest);
    this.collectionSize = this.request.length
  }
  reloadEmployee(){
    this.api.getAllRequestGrouped().subscribe(data=>{
      this.request=data["Expense Reimbersement"];
      console.log(this.request);
      this.displayRequest = this.request
      this.collectionSize=this.displayRequest.length
      this.spinner.hide()
      
    })
  }

  rejectRequest(item, index) {
    this.spinner.show()
    console.log(item._id);
    // item.data.assignVendor = true;
    item.data.status = "rejected";

    // let index=this.processorList.indexOf(item);

    console.log(index);
    this.api.updateRequest(item).subscribe(data => {
      console.log("success");
      console.log(data, "updated data");
      this.toast.success("rejected assigned")
      this.reloadEmployee()


    },err=>{
      this.spinner.hide()
      this.toast.error("failed to assign")
    })


  }
  ngOnInit() {

      // this.api.getAllRequestObservable().subscribe(data=>{
      //   this.request=data.filter(x=>x.type=="Expense Reimbersement")
      //   console.log(this.request);
        
      // }) 
      this.loadData()

    
  }
  loadData(){
    this.spinner.show()
    this.api.getAllRequestGrouped().subscribe(data=>{
      this.request=data["Expense Reimbersement"];
      console.log(this.request);
      if (this.request!==undefined) {
        this.displayRequest = this.request
      this.collectionSize=this.displayRequest.length
      this.spinner.hide()
      } else {
      this.spinner.hide()
        
      }

      
    },err=>{
      this.spinner.hide()
      this.toast.error("api err")
    })
  }


}
