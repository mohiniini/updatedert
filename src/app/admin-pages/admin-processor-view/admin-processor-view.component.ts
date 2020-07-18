import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-processor-view',
  templateUrl: './admin-processor-view.component.html',
  styleUrls: ['./admin-processor-view.component.css']
})
export class AdminProcessorViewComponent implements OnInit {

  constructor(private http:HttpService,private _location: Location,private spinner:NgxSpinnerService,private toast:ToastrService) { }
  processor:any[]=[];
  page = 1;
  pageSize = 5;
  collectionSize
  backClicked() {
    this._location.back();
  };
  displayProcessor=[]
  Searchfilter(event){
    console.log(event);
    console.log( typeof event);
    console.log(typeof this.processor[0].data.phone)
    console.log(this.processor);
    console.log(this.processor[0]);
    
    this.displayProcessor=this.processor.filter(x=>x.data.name.toLowerCase().includes(event.toLowerCase())||x.data.email.toLowerCase().includes(event.toLowerCase())||x.data.phone.toString().includes(event.toString())||x.data.processor_Unique_Id.toLowerCase().includes(event.toLowerCase()))
    console.log(this.displayProcessor);
    this.collectionSize=this.displayProcessor.length
  }

  ngOnInit() {
    // this.http.getProcessorObservable().subscribe(res=>{
    //   this.processor=res;
    //   this.collectionSize=this.processor.length
    // } )
    this.spinner.show()
    this.http.getAllProcessor().subscribe(data=>{
      this.processor=data;
      this.collectionSize=this.processor.filter(x=>x.data.softdelete==false).length
      console.log(this.processor);
      this.displayProcessor=this.processor.filter(x=>x.data.softdelete==false)
      this.spinner.hide()
    })
    
  }
  softDelete(id){
    this.spinner.show()
    console.log(id);
    let arr=this.displayProcessor.filter(x=>x._id==id)
    let processor=arr[0]
    processor.data.softdelete=true
    this.http.updateEmployee(processor).subscribe(data => {
      console.log("succesfully update");
      this.toast.info("vendor deleted");
      this.reloadData()

      
    });
    
  }

  reloadData(){
    // this.spinner.show()
    this.http.getAllProcessor().subscribe(data=>{
      this.processor=data;
      this.collectionSize=this.processor.filter(x=>x.data.softdelete==false).length
      console.log(this.processor);
      this.displayProcessor=this.processor.filter(x=>x.data.softdelete==false)
      this.spinner.hide()
    })

  }
    

}
