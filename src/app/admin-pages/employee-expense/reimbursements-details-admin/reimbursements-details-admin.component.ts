import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-reimbursements-details-admin',
  templateUrl: './reimbursements-details-admin.component.html',
  styleUrls: ['./reimbursements-details-admin.component.css']
})
export class ReimbursementsDetailsAdminComponent implements OnInit {

  constructor(
    private http: HttpService,
    private aroute: ActivatedRoute,
    private router: Router
  ) {}

  id = {
    requestId: ""
  };
  request;

  ngOnInit() {
    this.aroute.params.subscribe((params: Params) => {
      this.id.requestId = params["id"];
      console.log(this.id, "params id");
      this.loadContentOfRequest();
    });
  }
  loadContentOfRequest() {
    this.http.getRequestById(this.id).subscribe(data => {
      this.request = data;
      // this.item=[];
      // this.item.push(data.data)
      console.log(this.request);
      // console.log(this.item);
      // console.log(this.item.length);

      
    });
  }
  

}
