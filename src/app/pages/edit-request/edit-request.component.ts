import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http/http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Location } from '@angular/common';

// import { url } from './../../../model/url';
// import { HttpService } from './../../services/http/http.service';
// import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
// import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
// import { ActivatedRoute, Router } from '@angular/router';
import { RequestKeygenService } from 'src/app/services/RequestKeygen/request-keygen.service';
// import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
// import { request } from 'http';
// import { ToastrService } from 'ngx-toastr';
var states = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'];

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent implements OnInit {


 
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private toast: ToastrService



  ) { }

  request
  id = {
    requestId: ""
  };
  item = [];
  reason1;
  reason;
  type;
  backClicked() {
    this._location.back();
  }
  entry
  dependent = []
  check(i) {
    if (i - 2 > -1) {
      return true
    } else {
      return false
    }
  }
  mogcity = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune" ,"Jaipur", "Agra" , "Kanpur", "Varanasi" ,"Kerala","Lucknow" ,"Kolkata" ,"Kota" ,"Ludhiyana" ,"Indore" ,"Noida" ,"Gurgaon" ,"Surat","Jabalpur" ,"Gwalior" ,"Faridabad" ,"Amritsar" ,"Chennai","Chandigarh", "Bhopal","Ajmer","Allahabad","Patna","Others"];
  movcity = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Jaipur", "Agra", "Kanpur", "Varanasi", "Kerala", "Lucknow", "Kolkata", "Kota", "Ludhiyana", "Indore", "Noida", "Gurgaon", "Surat", "Jabalpur", "Gwalior", "Faridabad", "Amritsar", "Chennai", "Chandigarh", "Bhopal", "Ajmer", "Allahabad", "Patna", "Others"];

  userData;
  city = ["Bangalore", "Mumbai", " New Delhi", "Hyderabad", "Bhubaneswar", "Jaipur", "Guwahati", "Varanasi", "Tiruchirappalli", "Lucknow", "Kolkata", "Gwalior", "Indore", "Chennai", "Pune", "Bhopal", "kerala", "Ahmedabad", "Kochi", "Others"];

  hotelcity = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Jaipur", "Agra", "Kanpur", "Varanasi", "kerala", "Lucknow", "Kolkata", "Kota", "Ludhiyana", "Indore", "Noida", "Gurgaon", "Surat", "Jabalpur", "Gwalior", "Faridabad", "Amritsar", "Chennai", "Chandigarh", "Bhopal", "Ajmer", "Allahabad", "Patna","Others"];

  city1 = ["Bangalore", "Mumbai", " New Delhi", "Hyderabad", "Bhubaneswar", "Jaipur", "Guwahati", "Varanasi", "Tiruchirappalli", "Lucknow", "Kolkata", "Gwalior", "Indore", "Chennai", "Pune", "Bhopal", "kerala", "Ahmedabad", "Kochi", "others"];
  selectedItems = [];
  meridian = false;
  employee
  dropdownSettings = {};
  dropdownList = [];
  onItemSelect(item: any) {
    console.log('onItemSelect', item);
    console.log("this.selectedItems onItemSelect", this.selectedItems);

  }
  splitlogic(decision){
    if (decision=='Yes') {
      
    } else {
      this.request.data.detail.reasonforsplit=''
    }
  }
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? []
          : states
            .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10)
      )
    );

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
    console.log("this.selectedItems [onSelectAll]", this.selectedItems);
  }
  updateReq(){
    this.request.data.modifiedData={}

    if (this.type == "Flight Booking" || this.type == "Hotel Booking"||this.type == "Cab Booking") {
      let l = this.selectedItems.filter(x => x.item_text == "Self").length
    console.log(l);

    if (l > 0) {
      for (const iterator of this.selectedItems) {
        if (iterator.item_text == 'Self') {
          iterator.item_text = localStorage.getItem('userName')
        }
      }
    }
    for (const iterator of this.selectedItems) {
      let temp=iterator.item_text.split(' (')
      console.log(temp);
      iterator.item_text=temp[0];          
    }
    // this.request.data.modifiedData={}

    this.request.data.modifiedData.guest = this.selectedItems
    this.request.data.modifiedData.npeople = this.selectedItems.length
    
    }
    
    

    if (this.type == "Vehicle Movement") {
      this.request.data.modification="requested"
      // this.request.data.modifiedData={}

      this.request.data.modifiedData.vehicletype=this.vehicletype
        this.request.data.modifiedData.currentlocation=this.currentlocation
        this.request.data.modifiedData.location=this.othersmov
        this.request.data.modifiedData.origination=this.origination
        this.request.data.modifiedData.designation=this.destination
        this.request.data.modifiedData.dateofmovement=this.dateofmovementmov
    }
    if (this.type == "Grievances") {
      this.request.data.modification="requested"
      // this.request.data.modifiedData={}
      this.request.data.modifiedData.typesofgrievances=this.typeOfGrevience
      this.request.data.modifiedData.natureofgrievances=this.natureOfGreviance
      this.request.data.modifiedData.otherremarks=this.descriptiongreviance
      this.request.data.modifiedData.photo=this.imgriveance
      
    }
    if (this.type == "Flight Booking") {
      this.request.data.modification="requested"
      // this.request.data.modifiedData={}

      this.request.data.modifiedData.dot=this.dateoftravel
        this.request.data.modifiedData.dep=this.departurelocation
        this.request.data.modifiedData.arr=this.arrivallocation
        this.request.data.modifiedData.meal=this.meal
        this.request.data.modifiedData.tot=this.time
        // this.request.data.modifiedData.guest=this.selectedItems


    }
    if (this.type == "Hotel Booking") {
      this.request.data.modification="requested"
      // this.request.data.modifiedData={}

      this.request.data.modifiedData.splitAccomodation=this.splitAccomodation
        this.request.data.modifiedData.reasonforsplit=this.reasonforsplit
        this.request.data.modifiedData.startDate=this.checkinstartDate
        this.request.data.modifiedData.endDate=this.checkoutendDate
        this.request.data.modifiedData.location=this.destinationlocation
        this.request.data.modifiedData.reasonvalue=this.reasonvaluehotel
        this.request.data.modifiedData.noroooms=this.noofrooms
    }
    if (this.type == "Expense Reimbersement") {
      let obj={
        natureofexpense : this.natureOfExpense,
        amount : this.amountreimbursment,
        invoiceno : this.invoicereim,
        invoiceimage : this.imgreiem
      }
      this.request.data.modification="requested"
      this.request.data.modifiedData=obj
      
    }
    if (this.type == "Cab Booking") {
      this.request.data.modification = "requested"

      this.request.data.modifiedData.dot = this.dateofmovementcab
      this.request.data.modifiedData.tot = this.preferedtimecab
      this.request.data.modifiedData.arr = this.currentlocationcab
      this.request.data.modifiedData.dep = this.destinationcab
    }
    if (this.type == "Goods Movement") {
      this.request.data.modification = "requested"
      // this.request.data.modifiedData={}

      this.request.data.modifiedData.dateofmovement = this.dateofmovementmog
      this.request.data.modifiedData.pickupcity = this.pickupcitymog
      this.request.data.modifiedData.deliveryadd = this.deliverycitymog
      this.request.data.modifiedData.contactperson = this.contactpersonNamemog
      this.request.data.modifiedData.contactpersonemail = this.contactpersonEmailMog
      this.request.data.modifiedData.contactpersonphone = this.contactpersonPhoneNoMog
      this.request.data.modifiedData.requirementsofstorage = this.StorageMog
    }
    this.request.data.modificationExceptions=true
    this.http.updateRequest(this.request).subscribe(data=>{
      console.log("data updated");
      this.router.navigate(["../../../employee"], {
        relativeTo: this.aroute
      });
      
    })
  }

  vehicletype;
  currentlocation
  othersmov;
  origination;
  destination;
  dateofmovementmov;

  typeOfGrevience;
  natureOfGreviance;
  descriptiongreviance;
  imgriveance;

  natureOfExpense
  amountreimbursment
  invoicereim
  imgreiem

  splitAccomodation
  reasonforsplit
  checkinstartDate
  checkoutendDate
  destinationlocation
  reasonvaluehotel
  noofrooms

  dateoftravel
  departurelocation
  arrivallocation
  meal

  dateofmovementcab
  preferedtimecab
  currentlocationcab
  destinationcab

  dateofmovementmog
  pickupcitymog
  deliverycitymog
  contactpersonNamemog
  contactpersonEmailMog
  contactpersonPhoneNoMog
  StorageMog

  time
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
      
      if (this.type == "Vehicle Movement") {
        this.vehicletype=this.request.data.detail.vehicletype;
        this.currentlocation=this.request.data.detail.currentlocation
        this.othersmov=this.request.data.detail.location;
        this.origination=this.request.data.detail.origination
        this.destination=this.request.data.detail.designation
        this.dateofmovementmov=this.request.data.detail.dateofmovement
      }
      if (this.type == "Grievances") {
        this.typeOfGrevience=this.request.data.detail.typesofgrievances
        this.natureOfGreviance=this.request.data.detail.natureofgrievances
        this.descriptiongreviance=this.request.data.detail.otherremarks
        this.imgriveance=this.request.data.detail.photo

      }
      if (this.type == "Flight Booking") {
        console.log("Flightbookin");

        this.dropdownSettings = {
          singleSelection: false,
          idField: "item_id",
          textField: "item_text",
          selectAllText: "Select All",
          unSelectAllText: "UnSelect All",
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
        console.log(localStorage.getItem("userid"), "employee");

        let id = {
          "id": localStorage.getItem("userid")
        }
        this.http.getEmployeeDetail(id).subscribe(data => {
          this.employee = data[0].data


          var cnt = 1;
          this.dropdownList.push({
            item_id: cnt,
            item_text: "Self",
            item: this.employee
          });
          for (const iterator of this.request.data.guests) {
            console.log(cnt);

            if (iterator.item_id == cnt) {
              console.log("if");

              this.selectedItems.push({
                item_id: cnt,
                item_text: "Self",
                item: this.employee
              });
            }
          }
          cnt++;
          this.employee.guests.forEach(element => {
            this.dropdownList.push({
              item_id: cnt,
              item_text: element.name + " (" + element.relation + ")",
              item: element
            });
            this.request.data.guests
            for (const iterator of this.request.data.guests) {
              console.log(cnt);

              if (iterator.item_id == cnt) {
                console.log("if");

                this.selectedItems.push({
                  item_id: cnt,
                  item_text: element.name + " (" + element.relation + ")",
                  item: element
                });
              }
            }
            cnt++;
          });

        }, error => {
          this.toast.error("failed")
        });
        this.dateoftravel=this.request.data.detail.dot
        this.departurelocation=this.request.data.detail.dep
        this.arrivallocation=this.request.data.detail.arr
        this.meal=this.request.data.detail.meal
        this.time=this.request.data.detail.tot



      }
      if (this.type == "Hotel Booking") {

        this.dropdownSettings = {
          singleSelection: false,
          idField: "item_id",
          textField: "item_text",
          selectAllText: "Select All",
          unSelectAllText: "UnSelect All",
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
        let id = {
          "id": localStorage.getItem("userid")
        }
        this.http.getEmployeeDetail(id).subscribe(data => {
          this.employee = data[0].data


          var cnt = 1;
          this.dropdownList.push({
            item_id: cnt,
            item_text: "Self",
            item: this.employee
          });
          for (const iterator of this.request.data.guests) {
            console.log(cnt);

            if (iterator.item_id == cnt) {
              console.log("if");

              this.selectedItems.push({
                item_id: cnt,
                item_text: "Self",
                item: this.employee
              });
            }
          }
          cnt++;

          this.employee.guests.forEach(element => {
            this.dropdownList.push({
              item_id: cnt,
              item_text: element.name + " (" + element.relation + ")",
              item: element
            });
            for (const iterator of this.request.data.guests) {
              console.log(cnt);

              if (iterator.item_id == cnt) {
                console.log("if");

                this.selectedItems.push({
                  item_id: cnt,
                  item_text: element.name + " (" + element.relation + ")",
                  item: element
                });
              }
            }
            cnt++;
          });
        });
        this.splitAccomodation=this.request.data.detail.splitAccomodation
        this.reasonforsplit=this.request.data.detail.splitAccomodation
        this.checkinstartDate=this.request.data.detail.startDate
        this.checkoutendDate=this.request.data.detail.endDate
        this.destinationlocation=this.request.data.detail.location
        this.reasonvaluehotel=this.request.data.detail.reasonvalue
        this.noofrooms=this.request.data.detail.noroooms

      }
      if (this.type == "Expense Reimbersement") {
        this.natureOfExpense=this.request.data.detail.natureofexpense
        console.log(this.natureOfExpense);
        
        this.amountreimbursment=this.request.data.detail.amount
        this.invoicereim=this.request.data.detail.invoiceno
        this.imgreiem=this.request.data.detail.invoiceimage
      }
      if (this.type == "Cab Booking") {

        //this.arrModel = new FormControl("");
        // this.depModel = new FormControl("");
        this.dropdownSettings = {
          singleSelection: false,
          idField: "item_id",
          textField: "item_text",
          selectAllText: "Select All",
          unSelectAllText: "UnSelect All",
          itemsShowLimit: 3,
          allowSearchFilter: true
        };

       
        let id = {
          "id": localStorage.getItem("userid")
        }
        this.http.getEmployeeDetail(id).subscribe(data => {
          this.employee = data[0].data
          var cnt = 1;
          this.dropdownList.push({
            item_id: cnt,
            item_text: "Self",
            item: this.employee
          });
          for (const iterator of this.request.data.guests) {
            console.log(cnt);

            if (iterator.item_id == cnt) {
              console.log("if");

              this.selectedItems.push({
                item_id: cnt,
                item_text: "Self",
                item: this.employee
              });
            }
          }
          cnt++;
          this.employee.guests.forEach(element => {
            this.dropdownList.push({
              item_id: cnt,
              item_text: element.name + " (" + element.relation + ")",
              item: element
            });
            for (const iterator of this.request.data.guests) {
              console.log(cnt);

              if (iterator.item_id == cnt) {
                console.log("if");

                this.selectedItems.push({
                  item_id: cnt,
                  item_text: element.name + " (" + element.relation + ")",
                  item: element
                });
              }
            }
            cnt++;
          });
        });
        this.dateofmovementcab=this.request.data.detail.dot
        this.preferedtimecab=this.request.data.detail.tot
        this.currentlocationcab=this.request.data.detail.arr
        this.destinationcab=this.request.data.detail.dep
        
      }
      if (this.type == "Goods Movement") {
        this.dateofmovementmog=this.request.data.detail.dateofmovement
        this.pickupcitymog=this.request.data.detail.pickupcity
        this.deliverycitymog=this.request.data.detail.deliveryadd
        this.contactpersonNamemog=this.request.data.detail.contactperson
        this.contactpersonEmailMog=this.request.data.detail.contactpersonemail
        this.contactpersonPhoneNoMog=this.request.data.detail.contactpersonphone
        this.StorageMog=this.request.data.detail.requirementsofstorage


      }
      this.spinner.hide()
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
    this.request.data.detail.photo = reader.result;
    // console.log(this.request.data.detail.photo);
  }
  
  handleInputChange1(e) {
    console.log(e,"handle event")
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onload = this._handleReaderLoaded1.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded1(e) {
    let reader = e.target;
    this.request.data.detail.invoiceimage = reader.result;
    // console.log(this.request.data.detail.photo);
  }
  ngOnInit() {
    this.aroute.params.subscribe((params: Params) => {
      this.id.requestId = params["id"];
      console.log(this.id, "params id");
      this.loadContentOfRequest();
    });
  }

  
    
    
  

}
