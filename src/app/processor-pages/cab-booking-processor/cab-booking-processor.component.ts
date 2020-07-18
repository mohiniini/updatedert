import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cab-booking-processor',
  templateUrl: './cab-booking-processor.component.html',
  styleUrls: ['./cab-booking-processor.component.css']
})
export class CabBookingProcessorComponent implements OnInit {

  constructor(private http: HttpService,private toast:ToastrService,private spinner:NgxSpinnerService,private location: Location ) { }
  backClicked() {
    this.location.back();
  }
  request;valueOfTrue=true
  vendors;
  page = 1;
  pageSize = 5;
  collectionSize;
  id = {
    processorId: localStorage.getItem('userid')
  }
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
        || x.data.detail.arr.toLowerCase().includes(event.toLowerCase())
        || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
        // || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
        || this.datefilter(x.data.detail.dot, event)
        || x.data.status.toLowerCase().includes(event.toLowerCase())
      // || x.data.priority.toLowerCase().includes(event.toLowerCase())
    )
    console.log(this.displayRequest);
    this.collectionSize = this.request.length
  }
  ngOnInit() {
    this.loadData()

    
  }

  // -------------------------------------------------

  rejectRequest(item, index) {
    this.spinner.show()
    console.log(item._id);
    // item.data.assignVendor = true;
    item.data.status = "rejected";

    // let index=this.processorList.indexOf(item);

    console.log(index);
    this.http.updateRequest(item).subscribe(data => {
      console.log("success");
      console.log(data, "updated data");
      this.toast.success("rejected assigned")
      this.reloadEmployee()


    },err=>{
      this.spinner.hide()
      this.toast.error("failed to assign")
    })


  }

  save(item,index){
    this.spinner.show()

    if (item.data.vendorId!==undefined) {
      console.log(item._id);
      item.data.assignVendor=true;
      item.data.status="yellow";

    // let index=this.processorList.indexOf(item);
    
    console.log(index);
    this.http.updateRequest(item).subscribe(data=>{
      console.log("success");
      console.log(data,"updated data");
      let obj={
        "id": item.data.vendorId,
        "message": `cab booking request from ${item.data.detail.arr} to ${item.data.detail.dep} on ${item.data.detail.dot} at ${item.data.detail.tot.hour}:${item.data.detail.tot.hour}`
        }
      this.http.MailByUserId(obj).subscribe(data=>{
        console.log(data);
        
      })
      this.reloadEmployee()
      
      
    })
    } else {
      this.toast.warning("please select a vendor");
      this.spinner.hide()
    }
    
    
  }
  reloadEmployee() {
    this.http.getRequestWithprocessorId(this.id).subscribe(data => {
      this.request = data
      this.request = this.request.filter(x => x.type == "Cab Booking");
      this.displayRequest = this.request
      this.collectionSize = this.displayRequest.length
      console.log(this.request);
      this.spinner.hide()


    })
  }
  loadData(){
    this.spinner.show()
    this.http.getRequestWithprocessorId(this.id).subscribe(data => {
      this.request = data
      this.request = this.request.filter(x => x.type == "Cab Booking");
      this.displayRequest = this.request
      this.collectionSize = this.displayRequest.length
      console.log(this.request);
      this.http.getAllVendor().subscribe(res => {
        this.vendors = res;
        // this.collectionSize=this.vendor.length
        this.vendors = this.vendors.filter(x => x.data.domain.filter(y => y.Domain_name == "Cab Booking"))
        console.log(this.vendors);
        this.spinner.hide()
      })


    })
  }

}
