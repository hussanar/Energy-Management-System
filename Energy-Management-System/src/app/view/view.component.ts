import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  temp: any = [];

  variable: any;
  alluser: any;
  alluserData: any;
  constructor(public api: ApiService, private data: DataService, private router: Router) { }
  ngOnInit(): void {
    this.temp = this.data.pusharray
    console.log(this.temp[0])
    console.log(this.temp)
    for (let user of this.alluserData) {
      console.log(this.temp[user].email);
    }



  }
  view() {
    this.router.navigate(['view'])
  }



}
