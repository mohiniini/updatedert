import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-welcome-processor',
  templateUrl: './welcome-processor.component.html',
  styleUrls: ['./welcome-processor.component.css']
})
export class WelcomeProcessorComponent implements OnInit {

  constructor(private api:HttpService) { }

  processor;
  ngOnInit() {
    let id={id:localStorage.getItem('userid')}
    this.api.getEmployeeDetail(id).subscribe(data=>{
      this.processor=data[0]
      console.log(this.processor);
      
    })

  }

}
