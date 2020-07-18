import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private toast:ToastrService



  ) { }

  request
  id = {
    requestId: ""
  };
  item = [];
  type;
  backClicked() {
    this._location.back();
  }
  entry
  reasonforothers : "";
  reasonforothers1 : " ";
  dependent = []
  check(i) {
    if (i - 2 > -1) {
      return true
    } else {
      return false
    }
  }
  userData;
  loadContentOfRequest() {

    this.spinner.show()
    this.http.getRequestById(this.id).subscribe(data => {
      this.request = data; this.item = [];
      this.item.push(data.data)
      this.userData = data.users
      console.log(this.userData, "userdata");
      // this.request.data.status = "yellow"
      console.log(this.request, "request");
      console.log(this.item, "item");
      this.entry = this.item[0]
      console.log(this.entry);
      this.dependent = this.request.users.data.guests

      console.log(this.item.length);
      this.type = this.request.type
      console.log(this.type);
      this.spinner.hide()
    });
  }
  ngOnInit() {
    this.aroute.params.subscribe((params: Params) => {
      this.id.requestId = params["id"];
      console.log(this.id, "params id");
      this.loadContentOfRequest();
    });
  }

  Cancelrequest() {
    if (this.request.data.status == "green" ||this.request.data.status == "yellow") {
      if (this.request.data.status == "yellow") {
        this.toast.warning("sorry you can't cancel the request,it is  assigned to a vendor")
      }
      if (this.request.data.status == "green") {
        this.toast.warning("can't cancel, request already Completed")
        
      }
    } else {
      this.spinner.show()
    this.request.data.status = "cancel";
    this.http.updateRequest(this.request).subscribe(data => {
      console.log("success");
      console.log(data, "updated data");
      this.spinner.hide()
      this.router.navigate(["../../../employee"], {
        relativeTo: this.aroute
      });

      


    })
    }
  }

}
