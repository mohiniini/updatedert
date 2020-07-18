import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-expense-view-processor',
  templateUrl: './expense-view-processor.component.html',
  styleUrls: ['./expense-view-processor.component.css']
})
export class ExpenseViewProcessorComponent implements OnInit {

  constructor(private location: Location) { }
  backClicked() {
    this.location.back();
  }

  ngOnInit() {
  }

}
