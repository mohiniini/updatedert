import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";

interface Menu {
  title: string;
  path: string;
}
// const MENU:Menu[]=[{title:"employee",path:"admin-dashboard"}]
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  constructor(private http: HttpService) {}
  menuUsers: Menu[] = [
    // {title:"Dashboard",path:"admin-dashboard"},
    { title: "Employees", path: "employees" },
    { title: "Vendors", path: "VendorView" },
    { title: "Processors", path: "ProcessorView" }
  ];

  menuRequests: Menu[] = [
    // {title:"Dashboard",path:"admin-dashboard"},

    { title: "Flight Booking", path: "flight-bookin" },
    { title: "Hotel Booking", path: "hotel-bookin" },
    // {title:"Movements of Vehicles",path:"admin-dashboard"}
    { title: "Cab Booking", path: "cab-booking" },
    { title: "Expense Reimbursements", path: "expense-reimbersements" },
    { title: "Goods Movement", path: "movement-goods" },
    { title: "Vehicle Movement", path: "movement-Vehicles" },
    { title: "Escalation", path: "escalation-admin" }
  ];

  menuProcessorUsers: Menu[] = [
    // {title:"Dashboard",path:"admin-dashboard"},
    { title: "Employees", path: "employee-list" },
    { title: "Vendors", path: "vendor-list" }
  ];

  menuProcessorRequests: Menu[] = [
    // {title:"Dashboard",path:"admin-dashboard"},

    { title: "Flight Booking", path: "flight-booking" },
    { title: "Hotel Booking", path: "hotel-booking" },
    // {title:"Movements of Vehicles",path:"admin-dashboard"}
    { title: "Cab Booking", path: "cab-booking" },
    { title: "Expense Reimbursements", path: "expense" },
    { title: "Goods Movement", path: "mog" },
    { title: "Vehicle Movement", path: "mov" },
    { title: "Escalation", path: "escalation" }
  ];
  VendorRequests: any[] = [
    // {title:"Dashboard",path:"admin-dashboard"},

    { title: "Flight Booking", path: "flight-booking", role: 1 },
    { title: "Hotel Booking", path: "hotel-booking", role: 2 },
    // {title:"Movements of Vehicles",path:"admin-dashboard"}
    { title: "Cab Booking", path: "cab-booking", role: 5 },
    // { title: "Expense Reimbursements", path: "", role: 5 },
    { title: "Goods Movement", path: "mog", role: 3 },
    { title: "Vehicle Movement", path: "mov", role: 4 }
    // { title: "Query", path: "", role: 7 }
  ];
  menuVendorRequest = [];

  roleId;
  email;
  vendorDetail;
  ngOnInit() {
    // console.log(this.menuUsers);
    // console.log(this.menuUsers);
    this.roleId = localStorage.getItem("role");
    console.log(this.roleId);
    
    this.email = localStorage.getItem("userid");

    if (this.roleId == "vendor") {
      /*
      when loggin as a vendor this gets vendor details and
      then filter request menu according to the vendor which
      may differ
       */

      console.log("vendor login");
      let id={
        "id": localStorage.getItem("userid")
      }
      this.http.getEmployeeDetail(id).subscribe(data=>{
        this.vendorDetail=data[0].data
        // console.log(this.vendorDetail);
        
        // this.moveGoods.employee = res;
        console.log(this.vendorDetail);
        for (const domainItem of this.vendorDetail.domain) {
          console.log(domainItem.Domain_id);

          for (const requestItem of this.VendorRequests) {
            // console.log();

            if (domainItem.Domain_id == requestItem.role) {
              this.menuVendorRequest.push(requestItem);
            }
          }
        }
        console.log(this.menuVendorRequest);
      });

      // this.http.getVendorObservablebyEmail(this.email).subscribe(data => {
      //   this.vendorDetail = data;
      //   console.log(this.vendorDetail);
      //   for (const domainItem of this.vendorDetail[0].domain) {
      //     console.log(domainItem.Domain_id);

      //     for (const requestItem of this.VendorRequests) {
      //       // console.log();

      //       if (domainItem.Domain_id == requestItem.role) {
      //         this.menuVendorRequest.push(requestItem);
      //       }
      //     }
      //   }
      //   console.log(this.menuVendorRequest);
      // });
    }
  }
}
