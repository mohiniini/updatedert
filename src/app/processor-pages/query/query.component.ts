import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit  {

  constructor(private toast:ToastrService,private spinner: NgxSpinnerService,private api:HttpService ,private location: Location) { }
  backClicked() {
    this.location.back();
  }

  request;
  vendors:any[]=[];
  page = 1;
  pageSize = 5;
  collectionSize;

  datefilter(obj, event: string) {
    // let splitEvent=event.split('/')
    console.log();
    let dot = obj.day + "/" + obj.month + "/" + obj.year

    if (dot.includes(event)) {
      return true
    } else {
      return false
    }
  }
  displayRequest = []
  Searchfilter(event) {
    console.log(event);
    console.log(this.request);
    this.displayRequest = this.request.filter(
      x => x.data.name.toLowerCase().includes(event.toLowerCase())
      || x.data.detail.typesofgrievances.toLowerCase().includes(event.toLowerCase())
      || x.data.detail.natureofgrievances.toLowerCase().includes(event.toLowerCase())
      || x.data.detail.otherremarks.toLowerCase().includes(event.toLowerCase())
      || x.data.status.toLowerCase().includes(event.toLowerCase())
    )
    console.log(this.displayRequest);
    this.collectionSize = this.request.length
  }

  save(item,index){
    this.spinner.show()
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
  reloadEmployee(){
    this.api.getAllRequestGrouped().subscribe(data=>{
      this.request=data["Grievances"];
      console.log(this.request);
      this.spinner.hide()
      if (this.request!==undefined) {
        this.displayRequest = this.request.reverse()
      this.collectionSize=this.displayRequest.length
      this.spinner.hide()
      
      } else {
        this.spinner.hide()
      }
      
    })
  }
  loadData(){
    this.spinner.show()
    this.api.getAllRequestGrouped().subscribe(data=>{
      this.request=data["Grievances"];
      console.log(this.request);
      this.spinner.hide()
      
    })
  }

  ngOnInit() {

      // this.api.getAllRequestObservable().subscribe(data=>{
      //   this.request=data.filter(x=>x.type=="Expense Reimbersement")
      //   console.log(this.request);
        
      // }) 
      this.reloadEmployee()

    
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
      this.toast.success("Rejected ")
      this.reloadEmployee()


    },err=>{
      this.spinner.hide()
      this.toast.error("failed to assign")
    })


  } 

}
