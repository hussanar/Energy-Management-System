import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit {
  temp: any = [];
  variable: any;

  constructor(private api: ApiService, private data: DataService) { }

  ngOnInit(): void {
    this.temp = this.data.pusharray;
    console.log(this.temp);

    this.variable = JSON.parse(JSON.stringify(this.temp))
    console.log(this.variable)

  }
  show() {

  }

}
