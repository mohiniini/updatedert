import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-expenese-processor',
  templateUrl: './expenese-processor.component.html',
  styleUrls: ['./expenese-processor.component.css']
})
export class ExpeneseProcessorComponent implements OnInit  {

  constructor(private http:HttpService,private location: Location) { }
  backClicked() {
    this.location.back();
  }
  request;
  vendors;
  page = 1;
  pageSize = 5;
  collectionSize;
  
  id={
    processorId: localStorage.getItem('userid')
    }
  ngOnInit() {
    this.reloadEmployee()
   
   
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

  // -------------------------------------------------

  save(item,index){
    console.log(item._id);
    item.data.assignVendor=true;
    item.data.status="green";
    item.data.processorId=localStorage.getItem('userid')
    item.data.ticket = "close";

    // let index=this.processorList.indexOf(item);
    
    console.log(index);
    this.http.updateRequest(item).subscribe(data=>{
      console.log("success");
      console.log(data,"updated data");
      this.reloadEmployee()
      
      
    })
    
    
  }
  reloadEmployee(){
    this.http.getRequestWithprocessorId(this.id).subscribe(data=>{
      this.request=data
      this.request=this.request.filter(x=>x.type=="Expense Reimbersement");
      this.displayRequest = this.request
      this.collectionSize=this.displayRequest.length
      console.log(this.request);
      
    })
  }

}