import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-employee-hotel',
  templateUrl: './employee-hotel.component.html',
  styleUrls: ['./employee-hotel.component.css']
})
export class EmployeeHotelComponent implements OnInit {

  constructor(private toast: ToastrService, private spinner: NgxSpinnerService, private api: HttpService, private _location: Location) { }

  un=undefined;

  request:any[];
  vendors:any[] = [];;
  page = 1;
  pageSize = 5;
  collectionSize;
  backClicked() {
    this._location.back();
  }
  save(item, index) {
    console.log(item.data.vendorId);

    if (item.data.vendorId !== undefined) {
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
        let obj={
          "id": item.data.vendorId,
          "message": `Hotel Booking request from ${item.data.detail.startDate} to ${item.data.detail.endDate} in ${item.data.detail.location} with ${item.data.detail.noroooms} rooms`
          }
        this.api.MailByUserId(obj).subscribe(data=>{
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


    }, err => {
      this.spinner.hide()
      this.toast.error("failed to assign")
    })


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
  valueOfTrue=true
  Searchfilter(event) {
    console.log(event);
    console.log(this.request);
    this.displayRequest = this.request.filter(
      x => x.data.name.toLowerCase().includes(event.toLowerCase())
        || x.data.detail.location.toLowerCase().includes(event.toLowerCase())
        // || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
        // || x.data.detail.dep.toLowerCase().includes(event.toLowerCase())
        || this.datefilter(x.data.detail.endDate, event)
        || this.datefilter(x.data.detail.startDate, event)

        || x.data.status.toLowerCase().includes(event.toLowerCase())
        || x.data.priority.toLowerCase().includes(event.toLowerCase())
    )
    console.log(this.displayRequest);
    this.collectionSize = this.displayRequest.length
  }
  reloadEmployee() {
    this.api.getAllRequestGrouped().subscribe(data => {
      this.request = data["Hotel Booking"];
      console.log(this.request);
      this.displayRequest = this.request.reverse()
      this.collectionSize = this.displayRequest.length
      this.PriorityArray = []
      this.request.forEach(x => {


        let dobookin = new Date(x.data.detail.date);
        // dobookin.setFullYear(parseInt(doj[0]), parseInt(doj[1]) - 1, parseInt(doj[2]))

        let dojourney = new Date();
        dojourney.setFullYear(x.data.detail.startDate.year, x.data.detail.startDate.month - 1, x.data.detail.startDate.day)
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
    // this.api.getAllRequestObservable().subscribe(data=>{
    //   this.request=data.filter(x=>x.type=="Hotel Booking")
    //   console.log(this.request);

    // })

    this.loadData()

  }
  loadData() {
    this.spinner.show()
    this.api.getAllRequestGrouped().subscribe(data => {
      this.request = data["Hotel Booking"];
      this.displayRequest = this.request.reverse()
      this.collectionSize = this.request.length

      console.log(this.request);
      this.request.forEach(x => {


        let dobookin = new Date(x.data.detail.date);
        // dobookin.setFullYear(parseInt(doj[0]), parseInt(doj[1]) - 1, parseInt(doj[2]))

        let dojourney = new Date();
        dojourney.setFullYear(x.data.detail.startDate.year, x.data.detail.startDate.month - 1, x.data.detail.startDate.day)
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
        this.api.getAllVendor().subscribe(res => {
          this.vendors = res;
          this.spinner.hide()
          // this.collectionSize=this.vendor.length
        })
      })

    })
  }

}
