import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { RequestKeygenService } from "src/app/services/RequestKeygen/request-keygen.service";
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-add-processor",
  templateUrl: "./add-processor.component.html",
  styleUrls: ["./add-processor.component.css"]
})
export class AddProcessorComponent implements OnInit {
  processor = {
    name: "",
    role: "processor",
    processor_Unique_Id: this.key.processorKeygen(),
    email: "",
    phone: "",
    "softdelete": false
  };
  // api: any;
  constructor(
    //  private http: HttpService,
    private key: RequestKeygenService,
    private aroute: ActivatedRoute,
    private toastr: ToastrService,
    private api: HttpService,
    private router: Router, private _location: Location,

  ) { }


  backClicked() {
    this._location.back();
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
        if (res !== null) {
          this.toastr.success("File Uploaded!");

          console.log(res);
          for (let index = 1; index < res.Sheet1.length; index++) {
            const element = res.Sheet1[index];
            let obj = {
              name: element.A,
              role: "processor",
              processor_Unique_Id: this.key.processorKeygen(),
              email: element.B,
              phone: element.C,
              "softdelete": false
            };
            this.api.postNewEmployee(obj).subscribe(data => {
              console.log("successfully saved");
              console.log(data);
              
              console.log(`(index) ${index}=${res.Sheet1.length} (lenght)`);
              if (data.status == true) {
                
                console.log("successfully saved");
                console.log(`(index) ${index}=${res.Sheet1.length} (lenght)`);
              } else {
                let updateprocessor = data.doc;
                updateprocessor.data = obj;
                this.api.updateEmployee(updateprocessor).subscribe(data => {
                  console.log("succesfully update");
                });

              }
            });


          }
          this.toastr.success("Processor Added");
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
    // this.processor.name = new FormControl("");
    // this.processor.email = new FormControl("");
    //  this.processor.phone = new FormControl("");
  }

  addProcessor(f) {
    console.log(f);

    // console.log(this.processor.name.valid + "this.processor.name.valid")
    //  console.log(this.processor.email.valid + "this.processor.email.valid")
    // console.log(this.processor.phone.valid + "this.processor.phone.valid")
    //if(this.processor.name.valid && this.processor.email.valid && this.processor.phone.valid)
    // {
    this.processor.name = this.processor.name;
    this.processor.email = this.processor.email;
    this.processor.phone = this.processor.phone;
    this.processor.softdelete= false
    console.log(this.processor);
    this.api.postNewEmployee(this.processor).subscribe(data => {
      console.log("successfully saved");
      this.router.navigate(["../ProcessorView"], { relativeTo: this.aroute });
    });
  }
  //}


  // ===================================================================upload==================
  arrayBuffer: any;
  file: File;
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
 // ======================================================================
 }*/

  // ---------------------------------------------------------------------------
  // New Code

  /*selectedFile;
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
              role: "processor",
              name: element.A,
              email: element.B,
              Phone: element.C
             
            };
            this.api.postNewEmployee(obj).subscribe(data => {
              console.log("successfully saved");
              console.log(`(index) ${index}=${res.Sheet1.length} (lenght)`);
            });
            
  
          }
          this.toastr.success("Processor Added");
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
}
