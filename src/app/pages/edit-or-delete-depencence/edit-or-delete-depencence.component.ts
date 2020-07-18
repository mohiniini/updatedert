import { url } from './../../../model/url';
import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { FormsModule, FormControl } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-or-delete-depencence',
  templateUrl: './edit-or-delete-depencence.component.html',
  styleUrls: ['./edit-or-delete-depencence.component.css']
})
export class EditOrDeleteDepencenceComponent implements OnInit {

  addD: boolean = false;
  private edit: boolean = true;

  paramid;
  //changeEdit() {
  //this.edit = !this.edit;
  //  console.log(this.edit);
  //  }


  name;
  dob
  relation
  gender
  employee: any = {};
  guest: any = {
    name: '',
    dob: '',
    relation: '',
    gender: ''
  }
  completedetail;

  constructor(private http: HttpService, private api: HttpClient, private _location: Location, private toast: ToastrService, private router: Router, private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.reload()
  }

  reload() {
    // this.http
    //   .getmethod(this.url.baseurl+"employees/"+localStorage.getItem("employeeId"))
    //   .then((res: any) => {
    //     this.employee = res
    //   });
    this.aRoute.params.subscribe(
      data => {
        this.paramid = data.id
      }
    )



    let id = {
      "id": localStorage.getItem("userid")
    }
    this.http.getEmployeeDetail(id).subscribe(data => {
      console.log(data);

      this.employee = data[0].data
      this.completedetail = data[0]
      console.log(this.completedetail, "completedetail");

      console.log(this.completedetail);
      console.log(this.completedetail.data.Person_Full_Name_First_Last);


    })
  }
  backClicked() {
    this._location.back();
  }

  removeElement() {
    let index = this.completedetail.data.guests.indexOf(this.completedetail.data.guests[this.paramid]);
    if (index > -1) {
      this.completedetail.data.guests.splice(index, 1);
    }
    let id = {
      "id": localStorage.getItem("userid")
    }
    console.log(this.employee);

    this.http.updateEmployee(this.completedetail).subscribe(data => {
      console.log(data);
      this.router.navigate([`../../../employee/profile`], {
        relativeTo: this.aRoute
      });
    })

  }
  saveEmployee(f) {
    console.log(f);
    //if (f) {
      // this.http.putmethod(this.url.baseurl+localStorage.getItem("employeeId"), JSON.stringify(this.employee)).then((res: any) => {
      //   console.log(res)
      // })
      //let id = {
      //  "id": localStorage.getItem("userid")
      //}
      console.log(this.employee);

      this.http.updateEmployee(this.completedetail).subscribe(data => {
        console.log(data);
        this.router.navigate([`../../../employee/profile`], {
          relativeTo: this.aRoute
        });
      })

    } /*else {
      this.toast.warning("invalid input")

    }*/

  }


//}
