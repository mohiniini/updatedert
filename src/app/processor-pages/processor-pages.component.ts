import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processor-pages',
  templateUrl: './processor-pages.component.html',
  styleUrls: ['./processor-pages.component.css']
})
export class ProcessorPagesComponent implements OnInit {

  constructor() { }

  show:string;

  receiveMessage($event) {
    this.show = $event
  }
  ngOnInit() {
    this.show="open"
  }

  

}
