import { Component, OnInit } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { DecimalPipe, Location } from '@angular/common';
import { FormControl } from '@angular/forms';
//import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';
import { url } from "./../../../model/url";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { Router, CanActivate } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

var requestData = [];
const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

function search(text: string, pipe: PipeTransform): Country[] {
  return requestData.filter(country => {
    const term = text.toLowerCase();
    return country.type.toLowerCase().includes(term) || country.type.toLowerCase().includes(term);
  });
}

@Component({
  selector: 'app-employeebookings',
  templateUrl: './employeebookings.component.html',
  styleUrls: ['./employeebookings.component.css'],
  providers: [DecimalPipe]
})
export class EmployeebookingsComponent implements OnInit {

  url = new url();
  requestData = [];
  singleRequest: any;
  toogleDataNotFound=false;


  requestData$: Observable<any>;
  filter = new FormControl('');

  constructor(private spinner: NgxSpinnerService, private pipe: DecimalPipe, private http: HttpService, private modalService: NgbModal,
     private _location: Location,private aroute: ActivatedRoute,
     private router:Router,
     //private aRoute: ActivatedRoute,

   //private aRoute: ActivatedRoute,
   ) {
    this.requestData$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
    console.log(this.requestData$.subscribe(x => this.dummy = x));

  }
  backClicked() {
  // this._location.back();
   //this.router.navigate(["../employee/profile"], { relativeTo: this.aroute });
   this.router.navigate(["../../employee"], { relativeTo: this.aroute });
  }

  dummy;
  dateTog = "none";
  bookingTog = "none";
  dateFilter() {
    this.bookingTog = 'none'
   
    if (this.dateTog == 'none') {
      this.dateTog = 'up'
      this.requestData.sort(function (a, b) {
        let dateA: any = new Date(a.detail.date)
        let dateB: any = new Date(b.detail.date)
        return dateA - dateB //sort by date ascending
        // return new Date(b.detail.date) - new Date(a.date);     
      })
      console.log(this.requestData);
    } else if(this.dateTog == 'up') {
      this.dateTog = 'down'
        this.requestData.sort(function (a, b) {
          let dateA: any = new Date(a.detail.date)
          let dateB: any = new Date(b.detail.date)
          return dateB - dateA //sort by date desc
          // return new Date(b.detail.date) - new Date(a.date);     
        })
        console.log(this.requestData);
      
    }else if(this.dateTog == 'down') {
      this.dateTog = 'up'
      this.requestData.sort(function (a, b) {
        let dateA: any = new Date(a.detail.date)
        let dateB: any = new Date(b.detail.date)
        return dateA - dateB //sort by date ascending
        // return new Date(b.detail.date) - new Date(a.date);     
      })
      console.log(this.requestData);
    }
  }
  requestArgument="all"
  requestFilter(){
    console.log();
    
    if (this.requestArgument=="Expense Reimbersement") {
      this.requestData=this.allrequest.filter(x=>x.type=="Expense Reimbersement")
    } else if (this.requestArgument=="Flight Booking") {
      this.requestData=this.allrequest.filter(x=>x.type=="Flight Booking")
    } else if (this.requestArgument=="Cab Booking") {
      this.requestData=this.allrequest.filter(x=>x.type=="Cab Booking")
    } else if (this.requestArgument=="Grievances") {
      this.requestData=this.allrequest.filter(x=>x.type=="Grievances")
    } else if (this.requestArgument=="Hotel Booking") {
      this.requestData=this.allrequest.filter(x=>x.type=="Hotel Booking")
    } else if (this.requestArgument=="Goods Movement") {
      this.requestData=this.allrequest.filter(x=>x.type=="Goods Movement")
    } else if (this.requestArgument=="Vehicle Movement") {
      this.requestData=this.allrequest.filter(x=>x.type=="Vehicle Movement")
    } else  {
      this.requestData=this.allrequest
    }

    // let a=this.requestData.length
    // console.log(a,"a");
    
    if(this.requestData.length>0){
      console.log("greater than 0");
      
      this.toogleDataNotFound=false;
      console.log(this.toogleDataNotFound);

    }else{
      console.log("less than 0");
      
      this.toogleDataNotFound=true;
      console.log(this.toogleDataNotFound);
      
    }
    console.log(this.requestData.length);
    
  }
  bookingFilter() {
    this.dateTog = 'none'
    // if (this.C == 'none') {
    //   this.bookingTog = 'up'
    // } else {
    //   if (this.bookingTog = 'up') {
    //     this.bookingTog = 'down'
    //   } else {
    //     this.bookingTog = 'up'
    //   }
    // }
    if (this.bookingTog== 'none') {
      this.bookingTog = 'up'
      this.requestData.sort((a,b)=>{
        return a.type.localeCompare(b.type);
      })
      console.log(this.requestData);
      console.log(this.bookingTog);
      
      
    } else if(this.bookingTog == 'up') {
      this.bookingTog = 'down'
      this.requestData.sort((a,b)=>{
        return b.type.localeCompare(a.type);
      })
      console.log(this.requestData);

    }else if(this.bookingTog == 'down') {
      this.bookingTog = 'up'
      
      this.requestData.sort((a,b)=>{
        return a.type.localeCompare(b.type);
      })
      console.log(this.requestData);
    }
  }

  allrequest;
  loadData(){
    this.spinner.show()
    let id = {
      "userid": localStorage.getItem('userid')
    }
    this.http.getRequestByEmployeeId(id).subscribe(data => {
      this.requestData = data;
      console.log(this.requestData);
      this.requestData = this.requestData.map((x) => { return x.data });
      this.allrequest=this.requestData
      console.log(this.requestData);
      this.spinner.hide()
    })
  }
  ngOnInit() {
    this.loadData()
  }
  openScrollableContent(longContent, request) {
    this.modalService.open(longContent, { scrollable: true });
    this.singleRequest = request;

    console.log(this.singleRequest);

  }
  getmodalId(id) {
    return 'collapseExample' + id
  }

}
