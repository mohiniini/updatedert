import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { EventsService } from 'src/app/services/event/events.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    constructor(private _eventEmiter: EventsService,private router: Router, private aroute: ActivatedRoute, private http: HttpService) {
        this.up = false;
    }

    get FooterExistance() {
        if (this.router.url == '/pages/dashboard') {
            
            return false
        } else {
            
            
            return true
        }
    }
    onetime=0
    goUp(){
        if (this.router.url == '/pages/employee') {
            if (this.onetime==0) {
                this._eventEmiter.upEvent.subscribe(data => {console.log(data)
                    this.up=data

                this.onetime++})
            }
            return true
        } else {
            
            
            return true
        }

        
    }
    // footer = {
    //     _bar: false,
    //     get bar(): boolean {
    //         return this._bar;
    //     },
    //     set bar(value: boolean) {
    //         this._bar = value;
    //     }
    // }
    
    up
    OpenHome() {
        this.up = !this.up

        this.router.navigate(["../pages/employee"], { relativeTo: this.aroute });

    }
    OpenNew() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/AddDependency"], { relativeTo: this.aroute });

    }

    OpenGrievences() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/grievances"], { relativeTo: this.aroute });

    }

    OpenExpense() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/expenseReimbursements"], { relativeTo: this.aroute });

    }

    Openfight() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/flightbooking"], { relativeTo: this.aroute });

    }
    Openhotel() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/hotelbooking"], { relativeTo: this.aroute });

    }
    Opengoods() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/movementgood"], { relativeTo: this.aroute });

    }
    Openvehicle() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/movementvehicle"], { relativeTo: this.aroute });

    }

    Opencab() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/cabbooking"], { relativeTo: this.aroute });

    }

    
    Openpolicyholder() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/policyholder"], { relativeTo: this.aroute });

    }
    Openfaq() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/faq"], { relativeTo: this.aroute });

    }
    Openfeedback() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/feedback"], { relativeTo: this.aroute });

    }


    Openprofile() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/profile"], { relativeTo: this.aroute });

    }

    OpenActivity() {
        this.up = !this.up
        this.router.navigate(["../pages/employee/bookings"], { relativeTo: this.aroute });

    }
    toggleup() {
        this.up = !this.up
    }

    requestData=[0,0]
    href: string = "";
     id = {
        "userid": localStorage.getItem('userid')
    }
    upFunction(){
        if (this.router.url == '/pages/employee') {
            this.http.getRequestByEmployeeId(this.id).subscribe(data => {
                this.requestData = data;
                // console.log(this.requestData, "req");
                if (this.requestData.length > 0) {
                    this.up = false;
                } else {
                    this.up = true

                }
            })
        }
    }
    emp
    ngOnInit() {
        
        this.href = this.router.url;
        console.log(this.router.url);
        this.http.getEmployeeDetail({ id: localStorage.getItem('userid') }).subscribe(res => {
            this.emp = res[0];
            console.log(this.emp, "employees");
            this.upFunction()
          });
        
        

    }

}
