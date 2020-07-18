import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hotel-booking-processor',
  templateUrl: './hotel-booking-processor.component.html',
  styleUrls: ['./hotel-booking-processor.component.css']
})

export class HotelBookingProcessorComponent implements OnInit {

  constructor(private http: HttpService, private toast: ToastrService, private spinner: NgxSpinnerService , private location: Location) { }
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
        || x.data.detail.location.toLowerCase().includes(event.toLowerCase())
        || this.datefilter(x.data.detail.endDate, event)
        || this.datefilter(x.data.detail.startDate, event)

        || x.data.status.toLowerCase().includes(event.toLowerCase())
        || x.data.priority.toLowerCase().includes(event.toLowerCase())
    )
    console.log(this.displayRequest);
    this.collectionSize = this.displayRequest.length
  }
  ngOnInit() {
    // this.reloadEmployee()\
    this.loadData()


  }

  // -------------------------------------------------

  save(item, index) {
    this.spinner.show()

    if (item.data.vendorId !== undefined) {
      console.log(item._id);
      item.data.assignVendor = true;
      item.data.status = "yellow";

      // let index=this.processorList.indexOf(item);

      console.log(index);
      this.http.updateRequest(item).subscribe(data => {
        console.log("success");
        console.log(data, "updated data");
        let obj={
          "id": item.data.vendorId,
          "message": `Hotel Booking request from ${item.data.detail.startDate} to ${item.data.detail.endDate} in ${item.data.detail.location} with ${item.data.detail.noroooms} rooms`
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
      this.toast.info("rejected ")
      this.reloadEmployee()


    }, err => {
      this.spinner.hide()
      this.toast.error("failed to assign")
    })


  }
  reloadEmployee() {
    this.http.getRequestWithprocessorId(this.id).subscribe(data => {
      this.request = data
      this.request = this.request.filter(x => x.type == "Hotel Booking");
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
        this.spinner.hide()
      })

    })
  }
  loadData() {
    this.spinner.show()
    this.http.getRequestWithprocessorId(this.id).subscribe(data => {
      this.request = data
      this.request = this.request.filter(x => x.type == "Hotel Booking");
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
        this.http.getAllVendor().subscribe(res => {
          this.vendors = res
          // this.collectionSize=this.vendor.length
          console.log(this.vendors);
          this.vendors = this.vendors.filter(x => x.data.domain.filter(y => y.Domain_name == "Hotel Booking"))
          console.log(this.vendors);
          this.spinner.hide()

        })
      })

    })
  }


}
