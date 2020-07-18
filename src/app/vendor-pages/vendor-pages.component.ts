import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-pages',
  templateUrl: './vendor-pages.component.html',
  styleUrls: ['./vendor-pages.component.css']
})
export class VendorPagesComponent implements OnInit {

  constructor() { }
  // menu:Menu[]=[{title:"Employees",path:"admin/admin-dashboard"}]
  show:string;

  receiveMessage($event) {
    this.show = $event
  }
  ngOnInit() {
    this.show="open"
  }

}
