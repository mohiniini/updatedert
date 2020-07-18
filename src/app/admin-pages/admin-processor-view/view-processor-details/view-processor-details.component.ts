import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: "app-view-processor-details",
  templateUrl: "./view-processor-details.component.html",
  styleUrls: ["./view-processor-details.component.css"]
})
export class ViewProcessorDetailsComponent implements OnInit {
  constructor(
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router,private _location: Location
  ) {}
  user = { processorId: "" };
  employees=[];
  backClicked() {
    this._location.back();
  }
  ngOnInit() {
    this.aroute.params.subscribe((params:Params)=>{
      this.user.processorId=params.id;
    })
    console.log(this.user);
    
    this.http.getEmployeeUnderProcessor(this.user).subscribe(data => {
      console.log(data);
      this.employees=data;
    });
  }
}
