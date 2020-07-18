import { url } from "./../../../model/url";
import { Component, OnInit } from "@angular/core";
import { HttpService } from "./../../services/http/http.service";
import { NgbTypeahead } from "@ng-bootstrap/ng-bootstrap";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subject, merge } from "rxjs";
import { NgbDateStruct, NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { Route } from "@angular/compiler/src/core";
import { RequestKeygenService } from 'src/app/services/RequestKeygen/request-keygen.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

var states = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune"];

@Component({
  selector: "app-hotel-booking",
  templateUrl: "./hotel-booking.component.html",
  styleUrls: ["./hotel-booking.component.css"]
})
export class HotelBookingComponent implements OnInit {
  url = new url();

  city = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Jaipur", "Agra", "Kanpur", "Varanasi", "kerala", "Lucknow", "Kolkata", "Kota", "Ludhiyana", "Indore", "Noida", "Gurgaon", "Surat", "Jabalpur", "Gwalior", "Faridabad", "Amritsar", "Chennai", "Chandigarh", "Bhopal", "Ajmer", "Allahabad", "Patna","Others"];

  hoveredDate: NgbDate;
  datemodel1;
  datemodel2;

  from_Date;
  to_Date;

  fromDate;
  toDate;

  reason: string;
  reason1 : string;
  rooms: any = "1";

  //  splitAccomodation: any = false;
  splitAccomodation: string = '';
  details: boolean = false;
  employee: any = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  date: { year: number; month: number };

  meridian = false;

  depModel: string = '';
  arrModel: any;

  // request object

  request: any = {
    self: true,
    name: localStorage.getItem("userName"),
    status: "red",
    priority: "low severity / urgent / very urgent",
    ticket: "open",
    npeople: 0,
    employeeId: localStorage.getItem("userid"),
    guests: [],
    type: "Hotel Booking",
    detail: {

      splitaccommodation: "",
      reasonforsplit: " ",
      reasonvalue: " ",
      location: "",
      endDate: "",
      startDate: "",
      noroooms: "",
      date: Date()
    }
  };


  constructor(
    public http: HttpService,
    private calendar: NgbCalendar,
    private route: Router,
    private aRoute: ActivatedRoute
    , private key: RequestKeygenService,
    private _location: Location,
    private toast: ToastrService


  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), "d", 10);
  }
  backClicked() {
    this._location.back();
  }

 
  dateValidation(datemodel1, datemodel2) {

    let doj = localStorage.getItem('dateofjoining').split('/').reverse();
      let dojoining = new Date();
      dojoining.setFullYear(parseInt(doj[0]), parseInt(doj[1]) - 1, parseInt(doj[2]))
  
      let today = new Date();
      let docheckin = new Date(datemodel1);
      let docheckout = new Date(datemodel2);
      // docheckin.setFullYear(datemodel1.year, datemodel1.month - 1, datemodel1.day)
      // docheckout.setFullYear(datemodel2.year, datemodel2.month - 1, datemodel2.day)
      console.log(dojoining, 'dojoining');
      console.log(docheckin, 'docheckin');
      console.log(docheckout, 'docheckout')
      console.log(today, "today")
  
      // let Difference_In_Timechin = docheckin.getTime() - dojoining.getTime();
      let Difference_In_Dayschin= Math.floor((Date.UTC(docheckin.getFullYear(), docheckin.getMonth(), docheckin.getDate())-Date.UTC(dojoining.getFullYear(), dojoining.getMonth(), dojoining.getDate())) / (1000 * 60 * 60 * 24));
  
      // let Difference_In_Dayschin = Difference_In_Timechin / (1000 * 3600 * 24);
  
      // let Difference_In_Timechout = docheckout.getTime() - dojoining.getTime();
      // let Difference_In_Dayschout = Difference_In_Timechout / (1000 * 3600 * 24);
      let Difference_In_Dayschout= Math.floor((Date.UTC(docheckout.getFullYear(), docheckout.getMonth(), docheckout.getDate())-Date.UTC(dojoining.getFullYear(), dojoining.getMonth(), dojoining.getDate())) / (1000 * 60 * 60 * 24));
  
  
      // let DifferenceToday_In_Timechin = docheckin.getTime() - today.getTime();
      // let DifferenceToday_In_Dayschin = DifferenceToday_In_Timechin / (1000 * 3600 * 24);
      let DifferenceToday_In_Dayschin= Math.floor((Date.UTC(docheckin.getFullYear(), docheckin.getMonth(), docheckin.getDate())-Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));
  
  
      // let DifferenceToday_In_Timechout = docheckout.getTime() - today.getTime();
      // let DifferenceToday_In_Dayschout = DifferenceToday_In_Timechout / (1000 * 3600 * 24);
      let DifferenceToday_In_Dayschout= Math.floor((Date.UTC(docheckout.getFullYear(), docheckout.getMonth(), docheckout.getDate())-Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));
  
  
      // let DifferenceToday_In_Timechoutin = docheckout.getTime() - docheckin.getTime();
      // let DifferenceToday_In_Dayschoutin = DifferenceToday_In_Timechoutin / (1000 * 3600 * 24);
      let DifferenceToday_In_Dayschoutin= Math.floor((Date.UTC(docheckout.getFullYear(), docheckout.getMonth(), docheckout.getDate())-Date.UTC(docheckin.getFullYear(), docheckin.getMonth(), docheckin.getDate())) / (1000 * 60 * 60 * 24));
  
      console.log(Difference_In_Dayschin, "Difference_In_Dayschin");
      console.log(Difference_In_Dayschout, "Difference_In_Dayschout");
      console.log(DifferenceToday_In_Dayschin, "DifferenceToday_In_Dayschin");
      console.log(DifferenceToday_In_Dayschout, "DifferenceToday_In_Dayschout");
      console.log(DifferenceToday_In_Dayschoutin, "DifferenceToday_In_Dayschoutin");
  
      console.log(Difference_In_Dayschin);
      if (Difference_In_Dayschin > -4 && Difference_In_Dayschout > -4 && DifferenceToday_In_Dayschin >= 0 && DifferenceToday_In_Dayschout >= 0 && DifferenceToday_In_Dayschoutin >= 0) {
        if (Difference_In_Dayschin <= 90 && Difference_In_Dayschout <= 90 && DifferenceToday_In_Dayschin >= 0 && DifferenceToday_In_Dayschout >= 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
  
      
  }

  changeDate2(start,end){
    if(end==undefined){}
    else{
      if (this.dateValidation(start,end)) {
        let today = new Date();
        let docheckout = new Date(end);
        let DifferenceToday_In_Dayschout= Math.floor((Date.UTC(docheckout.getFullYear(), docheckout.getMonth(), docheckout.getDate())-Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));
  
        if (DifferenceToday_In_Dayschout > 0) {
          if (DifferenceToday_In_Dayschout <= 90) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
  
  
        
      } else {
        this.toast.warning("Selected date should in future and must lie between -3 to 90 days from joining date ")
      }
    
    }
    
  }

  changeDate1(start,end){
    if (this.dateValidation(start,end)) {
      let today = new Date();
      let docheckout = new Date(end);
      let DifferenceToday_In_Dayschout= Math.floor((Date.UTC(docheckout.getFullYear(), docheckout.getMonth(), docheckout.getDate())-Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));

      if (DifferenceToday_In_Dayschout > 0) {
        if (DifferenceToday_In_Dayschout <= 90) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }


      
    } else {
      this.toast.warning("Selected date should in future and must lie between -3 to 90 days from joining date ")
    }
  
  }



  dateValidationn(datemodel2) {
    let doj1 = localStorage.getItem('dateofjoining').split('/').reverse();
    let dojoining1 = new Date();
    dojoining1.setFullYear(parseInt(doj1[0]), parseInt(doj1[1]) - 1, parseInt(doj1[2]))

    let dojourney1 = new Date();
    dojourney1.setFullYear(datemodel2.year, datemodel2.month - 1, datemodel2.day)
    console.log(dojoining1, 'dojoining1');
    console.log(dojourney1, 'dojourney1');
    let Difference_In_Time1 = dojoining1.getTime() - dojourney1.getTime();
    let Difference_In_Days1 = Difference_In_Time1 / (1000 * 3600 * 24);
    console.log(Difference_In_Days1);
    if (Difference_In_Days1 > 0) {
      if (Difference_In_Days1 <= 90) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }

  }





  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }



  ngOnInit() {
    //  this.depModel = new FormControl("");
    //  this.splitAccomodation = new FormControl("");
    // this.rooms= new FormControl("");
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.selectedItems.push({
      item_id: 1,
      item_text: "Self",
      item: this.employee
    });
    let id = {
      "id": localStorage.getItem("userid")
    }
    this.http.getEmployeeDetail(id).subscribe(data => {
      this.employee = data[0].data


      var cnt = 1;
      this.dropdownList.push({
        item_id: cnt,
        item_text: "Self",
        item: this.employee
      });
      cnt++;
      this.employee.guests.forEach(element => {
        this.dropdownList.push({
          item_id: cnt,
          item_text: element.name +" ("+element.relation+")",
          item: element
        });
        cnt++;
      });
    });
  }

  //moredetails
  moreDetail() {
    this.details = !this.details;
  }

  //select functions
  // onItemSelect(item: any) {
  //   this.request.npeople = this.selectedItems.length;
  //   this.selectedItems.forEach(element => {
  //     if (element.item_id == 1) {
  //       this.request.self = true;
  //       // this.request.employee = this.employee;
  //     } else {
  //       this.request.guests.push(element);
  //     }
  //   });
  //   console.log(this.request);
  // }
  // onSelectAll(items: any) {
  //   this.request.npeople = this.selectedItems.length;
  //   this.selectedItems.forEach(element => {
  //     if (element.item_id == 1) {
  //       this.request.self = true;
  //       // this.request.employee = this.employee;
  //     } else {
  //       this.request.guests.push(element);
  //     }
  //   });
  //   console.log(this.request);
  // }

  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log("this.selectedItems onItemSelect", this.selectedItems);

  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
    console.log("this.selectedItems [onSelectAll]", this.selectedItems);
  }

  //calender functions


  //saving request
  saveRequest(f) {
    console.log(f)

    // console.log(this.depModel.valid + "this.depModel.valid")
    //console.log(this.datemodel1.valid + "this.datemodel1.valid");
    // console.log(this.datemodel2.valid + "this.datemodel2.valid");

    //  console.log(this.splitAccomodation.valid + "this.splitAccomodation.valid")
    //console.log(this.rooms.valid  + "this.rooms.valid")


    if(f.valid)
    {
    if (this.reason != undefined) {
      this.request.detail.reasonforsplit = this.reason;
    }
    if (this.splitAccomodation != undefined) {
      this.request.detail.splitaccommodation = this.splitAccomodation;
    }

    if (this.rooms != undefined) {
      this.request.detail.noroooms = this.rooms;
    }

    this.request.requestkey = this.key.hotelBookkingKeygen();
    this.request.detail.endDate = this.to_Date;
    this.request.detail.startDate = this.from_Date;
    this.request.detail.location = this.depModel;
    this.request.detail.arr = this.arrModel;
    this.request.detail.splitAccomodation = this.splitAccomodation;
    this.request.detail.reasonvalue = this.reason1;
    let l = this.selectedItems.filter(x => x.item_text == "Self").length
    console.log(l);

    if (l > 0) {
      for (const iterator of this.selectedItems) {
        if (iterator.item_text == 'Self') {
          iterator.item_text = localStorage.getItem('userName')
        }
      }
    }
    for (const iterator of this.selectedItems) {
      let temp=iterator.item_text.split(' (')
      console.log(temp);
      iterator.item_text=temp[0];          
    }
    this.request.guests = this.selectedItems
    this.request.npeople = this.selectedItems.length
    //this.request.detail.noroooms = this.rooms.value;
    console.log(this.request);


    console.log(JSON.stringify(this.request));
    console.log(this.request);


    //  if (this.dateValidation(this.datemodel1,this.datemodel2)  ) {

    // this.http.postRequest(this.request).subscribe(data => {
    //   console.log(data);
    //   this.toast.success("success")
    //   this.route.navigate(["../../employee/bookings"], {
    //     relativeTo: this.aRoute
    //   });

    // }, error => {
    //   this.toast.error("failed")
    // });
    /* else {
     this.toast.warning("selected Date must be within 90 Days from Date of Joining and Date should be in present or future")
   }*/
  
  //  if(l>0)
  //  {

   this.http.postRequest(this.request).subscribe(data => {
      console.log(data);
      console.log(data,"save hotel");
      console.log(typeof data);
      let jsonData=JSON.parse(data);
      
      this.route.navigate([`../../employee/feedback/${jsonData.id}`], {
        relativeTo: this.aRoute
      });
      this.toast.success("success")
    }, error => {
      this.toast.error("failed")
    })

    // this.route.navigate(["../../employee/bookings"],{relativeTo:this.aRoute});
  }
  // else if(l==0)
  // {
  //   this.toast.warning("Please select dependents")
  // }
}
}


