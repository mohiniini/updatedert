import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-flight',
  templateUrl: './employee-flight.component.html',
  styleUrls: ['./employee-flight.component.css']
})
export class EmployeeFlightComponent implements OnInit {

  constructor(private toast:ToastrService,private spinner: NgxSpinnerService,private api: HttpService, private _location: Location) { }

  un=undefined;
  request:any[];
  page = 1;
  pageSize = 5;
  collectionSize;
  vendors: any[] = [];
  backClicked() {
    this._location.back();
  }

  datefilter(obj, event: string) {
    // let splitEvent=event.split('/')
    console.log();
    let dot = obj

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
      || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
      || this.datefilter(x.data.detail.dot, event)
      || x.data.status.toLowerCase().includes(event.toLowerCase())
      || x.data.priority.toLowerCase().includes(event.toLowerCase())
    )
    console.log(this.displayRequest);
    this.collectionSize = this.request.length
  }

  save(item, index) {
    console.log(item.data.vendorId);
    if (item.data.vendorId!==undefined) {
      this.spinner.show()
    console.log(item._id);
    item.data.assignVendor = true;
    item.data.status = "yellow";

    // let index=this.processorList.indexOf(item);

    console.log(index);
    this.api.updateRequest(item).subscribe(data => {
      console.log("success");
      console.log(data, "updated data");
      this.toast.success("vendor assigned")
      // this.toast.success("vendor assigned")
      let obj={
        "id": item.data.vendorId,
        "message": `Flight Booking request from ${item.data.detail.arr} to ${item.data.detail.dep} on ${item.data.detail.dot} at ${item.data.detail.tot.hour}:${item.data.detail.tot.hour}`
        }
      this.api.MailByUserId(obj).subscribe(data=>{
        console.log(data);
        
      })
      this.reloadEmployee()
      


    },err=>{
      this.spinner.hide()
      this.toast.error("failed to assign")
    })
    } else {
      this.toast.warning("Please select a Vendor")
    }
    
    


  }
  valueOfTrue=true
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
      this.toast.info("rejected ")
      this.reloadEmployee()


    },err=>{
      this.spinner.hide()
      this.toast.error("failed to assign")
    })


  }
  reloadEmployee() {
    // this.toast.show()
    this.api.getAllRequestGrouped().subscribe(data => {
      this.request = data["Flight Booking"];
      this.collectionSize = this.request.length
      this.displayRequest = this.request.reverse()
      console.log(this.request);
      this.PriorityArray = []
      this.request.forEach(x => {
        let dobookin = new Date(x.data.detail.date);
        // dobookin.setFullYear(parseInt(doj[0]), parseInt(doj[1]) - 1, parseInt(doj[2]))
        let dojourney = new Date();
        dojourney.setFullYear(x.data.detail.dot.year, x.data.detail.dot.month - 1, x.data.detail.dot.day)
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
      this.spinner.hide()


    })
  }

  PriorityArray = []

  ngOnInit() {

    console.log(localStorage.getItem('userid'));

    // this.api.getAllRequestObservable().subscribe(data=>{
    //   this.request=data.filter(x=>x.type=="Flight Booking")
    //   console.log(this.request);

    // })

    this.dataLoad()


  }
  dataLoad(){
    this.spinner.show()
    this.api.getAllRequestGrouped().subscribe(data => {
      console.log(data);
      
      this.request = data["Flight Booking"];
      
      console.log(this.request);
      this.collectionSize = this.request.length
      this.displayRequest = this.request.reverse()

      this.request.forEach(x => {
        let dobookin = new Date(x.data.detail.date);
        // dobookin.setFullYear(parseInt(doj[0]), parseInt(doj[1]) - 1, parseInt(doj[2]))
        let dojourney = new Date(x.data.detail.dot);
        // dojourney.setFullYear(x.data.detail.dot)
        // console.log(dobookin, 'dobookin');
        // console.log(dojourney, 'dojourney');
        let Difference_In_Time = dojourney.getTime() - dobookin.getTime();
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        // console.log(Difference_In_Days, "Difference_In_Days");
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
      this.api.getAllVendor().subscribe(res => {
        this.vendors = res;
        console.log(this.vendors);
        
        // this.collectionSize=this.vendor.length
        this.spinner.hide()
      })


    })
    
  }

}
