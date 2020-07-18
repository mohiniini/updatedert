import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { RequestKeygenService } from "src/app/services/RequestKeygen/request-keygen.service";
import { HttpService } from 'src/app/services/http/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-add-vendor",
  templateUrl: "./add-vendor.component.html",
  styleUrls: ["./add-vendor.component.css"]
})
export class AddVendorComponent implements OnInit {
  myForm: FormGroup;
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  cities: any[] = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  constructor(
    private fb: FormBuilder,
    private key: RequestKeygenService,
    private api: HttpService,
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router, private _location: Location,
    private toastr: ToastrService,
    // private http: HttpClient,
    // private api: HttpService,
    // private aroute: ActivatedRoute,
    // private router: Router, private location: Location
    ) { }
  vendorDetail = {
    role: "vendor",
    name: "",
    vendor_Unique_Id: "",
    domain: "",
    address: "",
    email: "",
    phone_no: "",
    "softdelete":false
  };
  name
  address
  email
  phone_no
  domainName(arr: string) {
    let stringArray = arr.split(',');
    let domain = []
    for (let id of stringArray) {
      if (id=='1') {
        domain.push({ Domain_id: 1, Domain_name: "Flight Booking" })
      }
      if (id == '2') {
        domain.push({ Domain_id: 2, Domain_name: "Hotel Booking" })
      }
      if (id == '3') {
        domain.push({ Domain_id: 3, Domain_name: "Goods Movement" })
      }
      if (id == '4') {
        domain.push({ Domain_id: 4, Domain_name: "Vehicle Movement" })
      }
      if (id == '5') {
        domain.push({ Domain_id: 5, Domain_name: "Cab Booking" })
      }
    }
    
    return domain
   
    
  }
  // ================================================================
  selectedFile;
  fileupload(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    // this.upload()
  }

  async upload() {
    // await loader.present()
    if (this.selectedFile != null) {
      const fd = new FormData();
      fd.append("sampleFile", this.selectedFile);
      console.log(fd);

      this.api.uploadResource(fd).subscribe((res: any) => {
        if (res != null) {
          this.toastr.success("File Uploaded!");

          console.log(res);
          for (let index = 1; index < res.Sheet1.length; index++) {
            const element = res.Sheet1[index];
            let obj = {
              role: "vendor",
              name: element.A,
              vendor_Unique_Id: this.key.vendorKeygen(),
              domain: this.domainName(element.B),
              address: element.C,
              email: element.D,
              phone_no: element.E,
              "softdelete":false
            }
            this.api.postNewEmployee(obj).subscribe(data => {
              console.log("successfully saved");
              console.log(`(index) ${index}=${res.Sheet1.length} (lenght)`);
              if (data.status == true) {
                
                console.log("successfully saved");
                console.log(`(index) ${index}=${res.Sheet1.length} (lenght)`);
              } else {
                let updateVendor= data.doc;
                updateVendor.data = obj;
                this.api.updateEmployee(updateVendor).subscribe(data => {
                  console.log("succesfully update");
                });

              }
            });


          }
          this.toastr.success("Vendor Added");
          // let resourceid = res.resourceId;
          this.selectedFile = undefined;
          // this.resoursename = undefined;
          console.log(res);

          this.toastr = res.Resourse;
          // console.log(this.resouseArray);
          // this.resourceUpdate(this.resouseArray);
          // console.log(this.resouseDetailArray);

          // loader.dismiss()
        } else {
          this.toastr.warning("Error in file upload");

          // loader.dismiss()
        }
      }, err => {
        this.toastr.error("Error")
      });
    } else {
      this.toastr.warning("Please Select A File to Upload");
    }
  }
  // ==========================================================================


  ngOnInit() {

 //  this.name = new FormControl("");
  // this.address = new FormControl("");
   //  this.email = new FormControl("");
    // this.phone_no = new FormControl("");
    

    this.cities = [
      { Domain_id: 1, Domain_name: "Flight Booking" },
      { Domain_id: 2, Domain_name: "Hotel Booking" },
      { Domain_id: 3, Domain_name: "Goods Movement" },
      { Domain_id: 4, Domain_name: "Vehicle Movement" },
      //   { Domain_id: 5, Domain_name: 'Expense Reimbersement' },
      { Domain_id: 5, Domain_name: "Cab Booking" }
      //   { Domain_id: 7, Domain_name: 'Query' }
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "Domain_id",
      textField: "Domain_name",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
    };
    this.myForm = this.fb.group({
      city: [this.selectedItems]
    });
  }


 backClicked() {
  this._location.back();
}
  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }
  onSelectAll(items: any) {
    console.log("onSelectAll", items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      allowSearchFilter: this.ShowFilter
    });
  }

  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: 2
      });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
        limitSelection: null
      });
    }
  }

  save(f) {
    console.log(f);
    
   // console.log(this.name.valid,"this.vendorDetail.name.valid")
   // console.log(this.address.valid,"this.vendorDetail.address.valid")
   // console.log(this.email.valid,"this.vendorDetail.email.valid")
   // console.log(this.phone_no.valid,"this.vendorDetail.phone_no.valid")

  // if(this.name.valid && this.address.valid  &&  this.email.valid && this.phone_no.valid)
  // {  
    if(f.valid)
    {
      console.log(this.myForm.value.city);
    // this.vendorDetail.name
      this.vendorDetail.vendor_Unique_Id = this.key.vendorKeygen();
      this.vendorDetail.name = this.name;
      
      
      this.vendorDetail.address = this.address;
      this.vendorDetail.email = this.email;
      this.vendorDetail.phone_no  = this.phone_no ;
      this.vendorDetail.domain = this.myForm.value.city;
      this.vendorDetail.softdelete=false
      console.log(this.vendorDetail);
      // console.log("iuhius");
      
    // this.vendorDetail.address
    // this.vendorDetail.email
    // console.log(this.vendorDetail.name,"vendorDetai");
     this.http.postNewEmployee(this.vendorDetail).subscribe(data => {
       console.log("successfully saved");
       this.router.navigate(["../VendorView"], { relativeTo: this.aroute });
                   });

    // this.vendorDetail.phone_no
  }
}
}


  // ===================================================================upload==================
//arrayBuffer:any;
//file:File;
/*incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  }*/

 /*Upload() {
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        }
        fileReader.readAsArrayBuffer(this.file);
}
}*/




/*selectedFile;
  fileupload(event) 
  {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    // this.upload()
  }

  async upload() 
    
  {
    // await loader.present()
    if (this.selectedFile != null) {
      const fd = new FormData();
      fd.append("sampleFile", this.selectedFile);
      console.log(fd);

      this.http.uploadResource(fd).subscribe((res: any) => {
        if (res != null) {
          this.toastr.success("File Uploaded!");

          console.log(res);
          for (let index = 1; index < res.Sheet1.length; index++) {
            const element = res.Sheet1[index];
            let obj = {
              role: "vendor",
             
              
              name : element.A,
              domain_id : element.B,
              domain_name : element.C,
              address : element.D,
              email : element.E,
              phone_no : element.F

              
            };
            this.http.postNewEmployee(obj).subscribe(data => {
              console.log("successfully saved");
              console.log(`(index) ${index}=${res.Sheet1.length} (lenght)`);
            });
            

          }
          this.toastr.success("Vendor Added");
          // let resourceid = res.resourceId;
          this.selectedFile = undefined;
          // this.resoursename = undefined;
          console.log(res);

          this.toastr = res.Resourse;
          // console.log(this.resouseArray);
          // this.resourceUpdate(this.resouseArray);
          // console.log(this.resouseDetailArray);

          // loader.dismiss()
        } else {
          this.toastr.warning("Error in file upload");

          // loader.dismiss()
        }
      },err=>{
        this.toastr.error("Error")
      });
    } else {
      this.toastr.warning("Please Select A File to Upload");
    }
  }*/
//}