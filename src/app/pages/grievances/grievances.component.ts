import { Component, OnInit } from "@angular/core";
import { NgbCalendar } from "@ng-bootstrap/ng-bootstrap";
import { HttpService } from "src/app/services/http/http.service";
import { Router, ActivatedRoute } from "@angular/router";
import { url } from "./../../../model/url";
import { RequestKeygenService } from 'src/app/services/RequestKeygen/request-keygen.service';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-grievances",
  templateUrl: "./grievances.component.html",
  styleUrls: ["./grievances.component.css"]
})
export class GrievancesComponent implements OnInit {
  dependencybody = false;
  constructor(
    private calendar: NgbCalendar,
    public http: HttpService,
    private route: Router,
    private aRoute: ActivatedRoute
    ,private key: RequestKeygenService,private _location: Location,
    private toast:ToastrService
  ) {}
  url = new url();
  heading: boolean = false;
  public reason;
  employee: any = [];
  backClicked() {
    this._location.back();
  }

  grievances: any = {
    self: true,
    name:localStorage.getItem("userName"),
    npeople: 0,
    employeeId : localStorage.getItem("userid"),
    status:"red",
    priority:"low severity / urgent / very urgent",
    ticket:"open",
    
    guests: [],
    type: "Grievances",
    detail: {
      
      typesofgrievances: "",
      typeOfService: "",
      natureofgrievances: "" ,
      natureofreason: "" ,
      natureofreason1: "" ,
      otherremarks: "",
      photo: "",

      date: Date()
    }
  };
  imageSrc: any;
  typesOfGrievances: any;
  natureOfGrievances: any;
  natureofReason: any;
  natureofReason1: any;
  otherremarks: any ;
//  typeOfService: any;
  otherRemarks: any;

  ngOnInit() {
    //this.otherRemarks= new FormControl("");
    let id={
      "id": localStorage.getItem("userid")
    }
    this.http.getEmployeeDetail(id).subscribe(data=>{
      this.employee=data[0].data
      // this.moveGoods.employee = res;
    });
  }
  handleInputChange(e) {
    console.log(e,"handle event")
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
  }
  saveRequest(f) {
    console.log(f)
    //console.log(this.otherRemarks.valid + "this.otherRemarks.valid")
    
    // console.log(this.otherRemarks.invalid + "this.otherRemarks.invalid")
    //if(this.otherRemarks.valid){
    this.grievances.requestkey=this.key.grievancesKeygen();
   this.grievances.detail.typesofgrievances = this.typesOfGrievances;
   // this.grievances.detail.typeOfService = this.typeOfService;
    this.grievances.detail.otherremarks = this.otherRemarks;
    this.grievances.detail.natureofgrievances = this.natureOfGrievances;
    this.grievances.detail.natureofreason = this.natureofReason;
    this.grievances.detail.natureofreason1 = this.natureofReason1;
    
    // this.queryResoultion.detail.noRto = this.noRto;

    this.grievances.detail.photo = this.imageSrc;
    console.log(this.natureOfGrievances);
    
    console.log(this.grievances);
    // this.http
    //   .postmethod(
    //     this.url.baseurl + "requests/",
    //     JSON.stringify(this.grievances)
    //   )
    //   .then((res: any) => {
    //     console.log(res);

    //     this.route.navigate(["../../employee/bookings"], {
    //       relativeTo: this.aRoute
    //     });
    //   });
    // this.route.navigate(['bookings'])
    

      this.http.postRequest(this.grievances).subscribe(data=>{
        console.log(data);
        this.route.navigate(["../../employee/bookings"], {
          relativeTo: this.aRoute
                        }); 
                  
                  this.toast.success("success")
                },error=>{
                  this.toast.error("failed")
                })


    //}
     
  }

}
