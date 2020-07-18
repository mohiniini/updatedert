import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Router } from '@angular/router';

const states = [
  'My Profile','Hotel Booking','Flight Booking'
];
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menu:boolean=false;

  public model: any;
  @Input()employee=true;
  @Input()admin=true;

  show: string = "open"

  hideCollapse:string

  @Output() showEvent = new EventEmitter<string>();
  
  sendMessage() {
    
    if (this.show=="close") {
      this.show="open"
      this.showEvent.emit(this.show)
      
    } else {
      this.show="close"
      this.showEvent.emit(this.show)
    }
    
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  constructor(private routes:Router) { }

  role;
  ngOnInit() {
    this.role=localStorage.getItem('role')
  }
  logOut(){
    // localStorage.removeItem('userid');
    // //  localStorage.getItem('userid');
    //  localStorage.removeItem('username');
    //  localStorage.removeItem('roleId');
    //  localStorage.removeItem('employeeId');
    localStorage.clear();
    this.routes.navigate(['login'])
  }

  

}
