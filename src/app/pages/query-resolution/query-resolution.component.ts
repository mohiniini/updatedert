import { Component, OnInit } from '@angular/core';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { url } from "./../../../model/url";
import { RequestKeygenService } from 'src/app/services/RequestKeygen/request-keygen.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-query-resolution',
  templateUrl: './query-resolution.component.html',
  styleUrls: ['./query-resolution.component.css']
})
export class QueryResolutionComponent implements OnInit {

  dependencybody=false;
  constructor(
    private calendar: NgbCalendar,
    public http: HttpService,
    private route: Router
    ,private aRoute:ActivatedRoute
    ,private key: RequestKeygenService,
    private toast:ToastrService

  ) {}
  url = new url();
  heading: boolean = false;
  employee: any = [];

  queryResoultion: any = {
    self: true,name:localStorage.getItem("userName"),
    npeople: 0,
    employee: {},
    guests: [],
    type: "Query Resoultion",
    detail: {
     
      ticketno: "",
      query: "",
      reponse: "",
      photo:"",

      date: Date()
    }
  };

  imageSrc:any;
  ticketNo:any;
  query:any;
  reponse:any


  ngOnInit() {
    this.http.getmethod(this.url.baseurl + "employees/"+localStorage.getItem("employeeId")).then((res: any) => {
      this.employee = res;
      
    });
  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }
  saveRequest() {

    
    this.queryResoultion.requestkey=this.key.flightKeygen();
    this.queryResoultion.detail.ticketno = this.ticketNo;
    this.queryResoultion.detail.query = this.query;
    this.queryResoultion.detail.reponse = this.reponse;
    // this.queryResoultion.detail.noRto = this.noRto;
    
    this.queryResoultion.detail.photo = this.imageSrc;


    console.log(JSON.stringify(this.queryResoultion));

    this.http.postQueryResoultion(this.queryResoultion).subscribe(data=>{
      console.log(data);

        this.route.navigate(["../../employee/bookings"], {
          relativeTo: this.aRoute
        });

           this.toast.success("success")
          },error=>{
             this.toast.error("failed")
           })
          

    
    
    // this.http.postmethod(
    //     this.url.baseurl + "requests/",
    //     JSON.stringify(this.queryResoultion)
    //   )
    //   .then((res: any) => {
    //     console.log(res);

    //     this.route.navigate(["../../employee/bookings"], {
    //       relativeTo: this.aRoute
    //     });
    //   });
    // // this.route.navigate(['bookings'])
  }

}
