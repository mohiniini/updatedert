import { Component, OnInit } from '@angular/core';


interface Menu{
  title:string,
  path:string
}
@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

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
