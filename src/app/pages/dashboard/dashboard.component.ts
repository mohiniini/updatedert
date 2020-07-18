import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpService, private router: Router, private aroute: ActivatedRoute) {

  }
  username;
  OpenNew() {
    // this.router.navigate(["../pages/grievances"],)
    this.emp.data.firstTime = false;
    this.http.updateEmployee(this.emp).subscribe(data => {
      console.log("succesfully update");
      // this.router.navigate(["../employee"], { relativeTo: this.aroute });
      this.router.navigate(["../employee/AddDependency"], { relativeTo: this.aroute });

    });

  }
  OpenHome() {
    this.emp.data.firstTime = false;
    this.http.updateEmployee(this.emp).subscribe(data => {
      console.log("succesfully update");
      this.router.navigate(["../employee"], { relativeTo: this.aroute });
    });
    // this.router.navigate(["../pages/grievances"],)
    // this.router.navigate(["../employee"], { relativeTo: this.aroute });

  }

  emp
  ngOnInit() {

    if (localStorage.getItem('fT')=='true') {
      this.username = localStorage.getItem('userName')
    console.log("dashboard");

    this.http.getEmployeeDetail({ id: localStorage.getItem('userid') }).subscribe(res => {
      this.emp = res[0];
      console.log(this.emp, "employees");
    });
    } else {
      this.router.navigate(["../employee"], { relativeTo: this.aroute });
      
    }

  }


}
