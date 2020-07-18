import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  @Input('employee')employee;
  @Input() dependencyheading=true;
  @Input() dependencybody=true;
  
  details: boolean = false;
  constructor() {
  }

  ngOnInit() {
    console.log(this.employee)
    console.log(this.dependencyheading);
    

  }

  //moredetails
  moreDetail() {
    this.details = !this.details;
  }

}
