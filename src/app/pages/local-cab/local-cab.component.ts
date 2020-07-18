import { Component, OnInit } from '@angular/core';
import { url } from './../../../model/url';
  import { HttpService } from './../../services/http/http.service';
  import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
  import { Observable, Subject, merge } from 'rxjs';
  import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
  import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestKeygenService } from 'src/app/services/RequestKeygen/request-keygen.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



var states = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];


@Component({
  selector: 'app-local-cab',
  templateUrl: './local-cab.component.html',
  styleUrls: ['./local-cab.component.css']
})
export class LocalCabComponent implements OnInit {
  url = new url();

  details: boolean = false;
  employee: any = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  model
  //model: NgbDateStruct= this.calendar.getToday();
  date: { year: number; month: number };

  time = { hour: 13, minute: 30 };
  meridian = false;

  public depModel: any;
  public arrModel: any;
  dependencybody = false;
  heading: boolean = false;
  // request object

  request: any = {
    self: true,name:localStorage.getItem("userName"),
    npeople: 0,
    guests: [],
    employeeId : localStorage.getItem("userid"),
    status:"red",
    priority:"low severity / urgent / very urgent",
    ticket:"open",
    type: "Cab Booking",
    detail: {
      
      dot: "",
      tot: "",
      dep: "",
      arr: "",
      
      
      date: Date()
    }
  };

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? []
          : states
              .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
  constructor(
    public http: HttpService,
    private calendar: NgbCalendar,
    private aRoute: ActivatedRoute,
    private route: Router,
    private key: RequestKeygenService,private _location: Location,
    private toast:ToastrService


  ) {}
  backClicked() {
    this._location.back();
  }


  ngOnInit() {

    //this.arrModel = new FormControl("");
   // this.depModel = new FormControl("");
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
    let id={
      "id": localStorage.getItem("userid")
    }
    this.http.getEmployeeDetail(id).subscribe(data=>{
      this.employee=data[0].data
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
  selectToday() {
    this.model = this.calendar.getToday();
  }

  changeDate1(model){
      if (this.dateValidation(model)) {
        
      } else {
        this.toast.warning("Selected date should -3 to 90 days from start date ")
      }
    
    }
  

  dateValidation(model){
    let doj=localStorage.getItem('dateofjoining').split('/').reverse();
    let dojoining=new Date();
    dojoining.setFullYear(parseInt(doj[0]),parseInt(doj[1])-1,parseInt(doj[2]))

    let today=new Date();
    let dojourney=new Date(model);
    // dojourney.setFullYear(model.year,model.month-1,model.day)
    console.log(dojoining,'dojoining');
    console.log(dojourney,'dojourney');
    console.log(today,"today")

    let DifferenceToday_In_Days= Math.floor((Date.UTC(dojourney.getFullYear(), dojourney.getMonth(), dojourney.getDate())-Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) / (1000 * 60 * 60 * 24));
    let Difference_In_Days= Math.floor((Date.UTC(dojourney.getFullYear(), dojourney.getMonth(), dojourney.getDate())-Date.UTC(dojoining.getFullYear(), dojoining.getMonth(), dojoining.getDate())) / (1000 * 60 * 60 * 24));
    
    // let Difference_In_Time = dojourney.getTime() -dojoining.getTime() ; 
    // let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    // let DifferenceToday_In_Time =  dojourney.getTime() -today.getTime() ; 
    // let DifferenceToday_In_Days = DifferenceToday_In_Time / (1000 * 3600 * 24);

    console.log(Difference_In_Days);
    console.log(DifferenceToday_In_Days);
    let a=Math.round(DifferenceToday_In_Days)
    // if()

    if (Difference_In_Days>-4&&DifferenceToday_In_Days>=0 ) {
      if (Difference_In_Days<=90 &&DifferenceToday_In_Days>=0) {
        return true
      } else {
        return false
      }      
    } else {
      return false
    }
    
    

  }


  //saving request
  saveRequest(f) {
    console.log(f)
   
    if (this.dateValidation(this.model)) {
      
    } else {
      
    }
    if(f.valid)
    {
    
    this.request.requestkey=this.key.cabKeygen();
    this.request.detail.dot = this.model;
    this.request.detail.tot = this.time;
    this.request.detail.dep = this.depModel;
    this.request.detail.arr = this.arrModel;
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
    console.log(this.request);

       
      this.http.postRequest(this.request).subscribe(data => {
        console.log(data);
        console.log(data,"save cab");
      console.log(typeof data);
      let jsonData=JSON.parse(data);
        this.toast.success("success")
        this.route.navigate([`../../employee/feedback/${jsonData.id}`], {
          relativeTo: this.aRoute
        });
        
      }, error => {
        this.toast.error("failed")
      });
    } 


  }
                     
  }


