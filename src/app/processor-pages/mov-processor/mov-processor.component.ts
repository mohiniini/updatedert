import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mov-processor',
  templateUrl: './mov-processor.component.html',
  styleUrls: ['./mov-processor.component.css']
})
export class MovProcessorComponent implements OnInit {

  constructor(private http: HttpService,private toast:ToastrService,private spinner: NgxSpinnerService,private location: Location) { }
  backClicked() {
    this.location.back();
  }
  request;valueOfTrue=true
  vendors;
  page = 1;
  pageSize = 5;
  collectionSize
  id = {
    processorId: localStorage.getItem('userid')
  }

  PriorityArray = []
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
        || x.data.detail.vehicletype.toLowerCase().includes(event.toLowerCase())
        || x.data.detail.origination.toLowerCase().includes(event.toLowerCase())
        || x.data.detail.designation.toLowerCase().includes(event.toLowerCase())

        // || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
        || this.datefilter(x.data.detail.dateofmovement, event)
        || x.data.status.toLowerCase().includes(event.toLowerCase())
        || x.data.priority.toLowerCase().includes(event.toLowerCase())
    )
    // console.log(this.displayRequest);
    this.collectionSize = this.request.length
  }

  ngOnInit() {
    this.loadData()

    
  }

  // -------------------------------------------------

  save(item,index){
    console.log(item.data.vendorId);

    if (item.data.vendorId !== undefined) {
      console.log(item._id);
    item.data.assignVendor=true;
    item.data.status="yellow";

    // let index=this.processorList.indexOf(item);
    
    console.log(index);
    this.spinner.show()
    this.http.updateRequest(item).subscribe(data=>{
      console.log("success");
      console.log(data,"updated data");
      this.toast.success("vendor assigned")
      let obj={
        "id": item.data.vendorId,
        "message": `Vehicle Movement request from ${item.data.detail.origination} to ${item.data.detail.designation} on ${item.data.detail.dateofmovement} `
        }
      this.http.MailByUserId(obj).subscribe(data=>{
        console.log(data);
        
      })
      this.reloadEmployee()
      
      
    }, err => {
      this.spinner.hide()
      this.toast.error("failed to assign")
    })
  } else {
    this.toast.warning("Please select a Vendor")
  }
    
    
  }
  reloadEmployee() {
    this.http.getRequestWithprocessorId(this.id).subscribe(data => {
      this.request = data
      this.request = this.request.filter(x => x.type == "Vehicle Movement");
      console.log(this.request);
      this.displayRequest = this.request
      this.collectionSize=this.displayRequest.length
      this.PriorityArray = []
      this.request.forEach(x => {


        let dobookin = new Date(x.data.detail.date);
        // dobookin.setFullYear(parseInt(doj[0]), parseInt(doj[1]) - 1, parseInt(doj[2]))

        let dojourney = new Date();
        dojourney.setFullYear(x.data.detail.dateofmovement.year, x.data.detail.dateofmovement.month - 1, x.data.detail.dateofmovement.day)
        console.log(dobookin, 'dobookin');
        console.log(dojourney, 'dojourney');
        let Difference_In_Time = dojourney.getTime() - dobookin.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        console.log(Difference_In_Days, "Difference_In_Days");
        if (Difference_In_Days > 5) {
          this.PriorityArray.push("Low Severity")
          x.data.priority = "Low Severity"

        } else {
          if (Difference_In_Days > 3) {
            this.PriorityArray.push("Urgent")
            x.data.priority = "Urgent"

          } else {
            this.PriorityArray.push("Very Urgent")
            x.data.priority = "Very Urgent"

          }
          this.spinner.hide()

        }
      })

    })
  }
  rejectRequest(item, index) {
    this.spinner.show()
    console.log(item._id);
    item.data.status = "rejected";

    console.log(index);
    this.http.updateRequest(item).subscribe(data => {
      console.log("success");
      console.log(data, "updated data");
      this.toast.info("rejected")
      this.reloadEmployee()


    },err=>{
      this.spinner.hide()
      this.toast.error("failed to assign")
    })


  }
  loadData(){
    this.spinner.show()
    this.http.getRequestWithprocessorId(this.id).subscribe(data => {
      this.request = data
      this.request = this.request.filter(x => x.type == "Vehicle Movement");
      console.log(this.request);
      this.displayRequest = this.request
      this.collectionSize=this.displayRequest.length
      this.PriorityArray = []
      this.request.forEach(x => {


        let dobookin = new Date(x.data.detail.date);
        // dobookin.setFullYear(parseInt(doj[0]), parseInt(doj[1]) - 1, parseInt(doj[2]))

        let dojourney = new Date();
        dojourney.setFullYear(x.data.detail.dateofmovement.year, x.data.detail.dateofmovement.month - 1, x.data.detail.dateofmovement.day)
        console.log(dobookin, 'dobookin');
        console.log(dojourney, 'dojourney');
        let Difference_In_Time = dojourney.getTime() - dobookin.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        console.log(Difference_In_Days, "Difference_In_Days");
        if (Difference_In_Days > 5) {
          this.PriorityArray.push("Low Severity")
          x.data.priority = "Low Severity"

        } else {
          if (Difference_In_Days > 3) {
            this.PriorityArray.push("Urgent")
            x.data.priority = "Urgent"

          } else {
            this.PriorityArray.push("Very Urgent")
            x.data.priority = "Very Urgent"

          }

        }
        

      })
      this.http.getAllVendor().subscribe(res => {
        this.vendors = res;
        console.log(this.vendors,"vendor");
        
  
        console.log(this.vendors);
        this.spinner.hide()
  
        // this.collectionSize=this.vendor.length
      })

    })
  }

}
