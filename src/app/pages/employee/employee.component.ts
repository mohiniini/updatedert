import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsService } from 'src/app/services/event/events.service';
//import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  

  constructor(private _eventEmiter:EventsService,private spinner: NgxSpinnerService,private http: HttpService, private _location: Location, private router: Router, private aroute: ActivatedRoute) {

  }
  backClicked() {
    this._location.back();
  }

  



  employee;
  completedetail
  // empdob
  requestData
  allrequest;
  doj;
  username;
  serviceExpiry;
  empty
  daystoogle=true
  dateofService() {
    let doj = localStorage.getItem('dateofjoining').split('/').reverse();
    let dojoining = new Date();
    dojoining.setFullYear(parseInt(doj[0]), parseInt(doj[1]) - 1, parseInt(doj[2]))

    let today = new Date();
    // let Difference_In_Time =   dojoining.getTime() -today.getTime();
    // let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    let Difference_In_Days= Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())-Date.UTC(dojoining.getFullYear(), dojoining.getMonth(), dojoining.getDate())) / (1000 * 60 * 60 * 24));

    console.log(Difference_In_Days);
    

    if (Difference_In_Days > -3&&Difference_In_Days<91) {
      let num = 90 - Difference_In_Days;
      this.serviceExpiry=Math.round(num)
    } else {
      this.serviceExpiry = " Service not available"
      this.daystoogle=false;

    }
  }
  ngOnInit() {
    this.username = localStorage.getItem('userName')
    this.doj = localStorage.getItem('dateofjoining')
    this.dateofService()
    this.loadingData()
    
  }
  loadingData(){
    this.spinner.show();
    let id = {
      "userid": localStorage.getItem('userid')
    }
    this.http.getRequestByEmployeeId(id).subscribe(data => {
      this.requestData = data;
      console.log(this.requestData, "req");
      for (const iterator of this.requestData) {
        if (iterator.type == "Flight Booking" || iterator.type == "Cab Booking" || iterator.type == "Hotel Booking") {

          for (const item of iterator.data.guests) {
            // console.log(item);
            let tem:string=item.item_text
            // console.log(tem);
            
            
            if (tem.includes(" ")) {
              let temp = item.item_text.split(" ")
              item.item_text = temp[0]
            }

          }
        } else {
          iterator.data.guests = [{ item_text: this.username }]
          
        }

      }

      this.requestData = this.requestData.reverse();
      this.allrequest = this.requestData.map((x) => { return x.data });
      this.allrequest = this.allrequest.reverse()
      console.log(this.requestData);
      let len=this.requestData.length
      console.log(len);
      if (len>0) {
        this.empty=true
      }else{
        this.empty=false
        this._eventEmiter.sendMessage(true)
      }
      this.spinner.hide();
      



    })
  }
  

}
