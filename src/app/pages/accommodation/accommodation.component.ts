import { HttpService } from './../../services/http/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

var states = ['Bangalore','Mumbai','Delhi','Hyderabad','Pune'];
@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  model: any;

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  focus$ = new Subject<string>();
  click$ = new Subject<string>();


  employeeDetails: any = {
    id: 0,
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    phoneno: '',
    emailid: '',
    dob: '',
    guests: [

    ]
  };

  guestList: any = [];

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate
  constructor(private http: HttpService, calendar: NgbCalendar) {

    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);

  }

  ngOnInit() {

    this.http
      .getmethod("http://192.168.0.81:3000/employees/1")
      .then((res: any) => {
        this.employeeDetails = res;
      });
  }

  //adding guest
  addGuest($guest){

    this.guestList.push($guest)

  }

  //remove guest
  removeGuest($guest){

    this.guestList = this.guestList.filter(function(value, index, arr){

      return value!=$guest;
  
    });

    

  }


  // date picker
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
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
