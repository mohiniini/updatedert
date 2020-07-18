import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-data',
  templateUrl: './modal-data.component.html',
  styleUrls: ['./modal-data.component.css']
})
export class ModalDataComponent implements OnInit {


  @Input() data:any;
  constructor() { }
   
  guest;
  detail;

  ngOnInit() {

    console.log(this.data);
    this.guest=this.data.guests;
    this.guest=this.data.detail
  }

}
