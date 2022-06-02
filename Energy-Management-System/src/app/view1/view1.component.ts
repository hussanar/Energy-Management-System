import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit {
  temp: any;
  variable: any;

  constructor(private api: ApiService, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      console.log(params.data)
      this.data.getDataById('energy-management-login', params.data).subscribe(Response => {
        this.temp = Response
        console.log(Response);
        alert('get data successfully');
      }, _rej => {
        alert('sorry Cant Get the Object')
      }
      );

    })
    this.temp = this.data.pusharray;
    console.log(this.temp)


  }


}
