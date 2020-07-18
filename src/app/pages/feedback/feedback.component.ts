import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from "src/app/services/http/http.service";
import { ActivatedRoute, Router } from '@angular/router';
//import {StarRatingComponent} from 'ng-starrating';

@Component({
  selector: '.app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(config: NgbRatingConfig, public http: HttpService,private aroute:ActivatedRoute,private router:Router) { config.max = 5;
    config.readonly = false; }
    userRating=0

    id;
    Remarks;
    request
    rating={
      stars:0,
      remarks:""
    }
    rateRequest(){
      this.request.data.rating=this.rating
      this.request.data.rating.remarks= this.Remarks;
      this.http.updateRequest(this.request).subscribe(data=>{
        console.log(data);
        this.router.navigate([`../../../employee`], {
          relativeTo: this.aroute
        });

        
      })

    }

    Norate()
    {
      this.request.data.rating=this.rating
      this.request.data.rating.stars==0
      this.request.data.rating.remarks=""
      this.http.updateRequest(this.request).subscribe(data=>{
        console.log(data);
        this.router.navigate([`../../../employee`], {
          relativeTo: this.aroute
        });

        
      })

    }
  ngOnInit() {
    this.aroute.params.subscribe(data=>{
      this.id=data.id;
      console.log(this.id,"id");
      let obj={
        requestId:this.id
      }
      this.http.getRequestById(obj).subscribe(
        data=>{
          console.log(data);          
          this.request=data
        }
      )
      
    })

  }

    
}

