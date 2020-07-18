import { Component, OnInit } from "@angular/core";
import { Route, Router } from "@angular/router";
import { HttpService } from "src/app/services/http/http.service";
import { url } from "./../../../model/url";
import { log } from 'util';
import { ToastrService } from 'ngx-toastr';
//import * as microsoftTeams from "@microsoft/teams-js";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username = "";

  constructor(private route: Router, public http: HttpService, private toast: ToastrService) { }

  ngOnInit() {

  }

  url = new url();

  //delete after
  onLogin() {

    this.http
      .getmethod(
        this.url.baseurl + "users?username=" + this.username + "&password="
        //  +
        // this.password
      )
      .then((res: any) => {
        localStorage.setItem("username", res[0].username);

        localStorage.setItem("userid", res[0].id);
        localStorage.setItem("roleId", res[0].roleId);
        let roleid = localStorage.getItem("roleId");
        console.log();

        switch (roleid) {
          case "1":
            console.log("1");
            this.route.navigate(["/admin"]);

            break;
          // this.route.navigate(["/pages"]);

          case "2":
            console.log("2");
            this.route.navigate(["/vendor"]);

            break;
          case "3":
            console.log("3");
            this.http
              .getmethod(
                this.url.baseurl +
                "processor?email=" +
                localStorage.getItem("username")
              )
              .then((res: any) => {
                localStorage.setItem("processorId", res[0].id);
                console.log(res[0].id);

                // this.route.navigate(["/pages"]);
                this.route.navigate(["/processor"]);

              });
            // this.route.navigate(["/processor"])
            break;
          case "4":
            console.log("4");
            this.http
              .getmethod(
                this.url.baseurl +
                "employees?Person_Email_Address=" +
                localStorage.getItem("username")
              )
              .then((res: any) => {
                localStorage.setItem("employeeId", res[0].id);
                console.log(res[0].id);

                this.route.navigate(["/pages"]);

              });

            break;
        }
        // console.log(res);
      });
    // if (this.password == '123456' && this.username == 'super@user.com') {
    //   localStorage.setItem('id', 'user1');
    //   this.route.navigate(['pages']);

    // }else{
    //   alert("wrong password");
    // }
  }
  user: any;
  onlogin() {
    let user = {
      email: this.username.trim()
    };

    this.http.loginVerification(user).subscribe(data => {
      this.user = data[0];
      console.log(this.user, 'user');

      let id = this.user._id;
      // let name=
      let role = this.user.role;
      localStorage.setItem("role", role)
      console.log(id, "id");
      console.log(role, "role");
      console.log(localStorage.getItem('role'));


      switch (role) {
        case "admin":
          localStorage.setItem("userid", id);

          console.log(localStorage.getItem('userid'));
          this.route.navigate(["/admin"]);
          this.toast.success("success")



          break;
        case "employee":
          localStorage.setItem("userid", id);
          localStorage.setItem("dateofjoining", this.user.data.Person_Start_Date)
          localStorage.setItem("userName", this.user.data.Person_Full_Name_First_Last)
          console.log(localStorage.getItem('userid'));
          localStorage.setItem("fT", this.user.data.firstTime)

          console.log(localStorage.getItem('userid'));
          if (localStorage.getItem('fT') == 'true') {
            this.route.navigate(["/pages"]);

          } else {
            this.route.navigate(["/pages/employee"]);

          }
          this.toast.success("success")




          break;
        case "vendor":
          localStorage.setItem("userid", id);
          console.log(localStorage.getItem('userid'));
          this.route.navigate(["/vendor"]);
          this.toast.success("success")



          break;

        case "processor":
          localStorage.setItem("userid", id);
          console.log(localStorage.getItem('userid'));
          this.route.navigate(["/processor"]);
          this.toast.success("success")



          break;


        case "default":
          localStorage.setItem("userid", id);
          console.log(localStorage.getItem('userid'));
          //this.route.navigate(["/processor"]);
          alert("please use valid input");
          //this.toast.warning("use valid input")




          break;




      }


    });

  }

}






