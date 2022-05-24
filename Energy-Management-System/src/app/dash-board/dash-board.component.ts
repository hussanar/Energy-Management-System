import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  temp: any;
  variable: any;
  TotalNumberOfUsers: any;
  email: any;
  response: any;
  typedData: any;
  total: any;;

  constructor(private router: Router, private Acrouter: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {

    let db = 'energy-management-login';
    this.data.getnumbers(db).subscribe((res => {
      console.log(res);
      this.temp = res;
      this.TotalNumberOfUsers = this.temp.rows.length;
      this.Acrouter.queryParams.subscribe(res => {
        console.log(res);
        this.data.getDocByIds("energy-management-login", res.data).subscribe(res => {
          console.log(res)
          this.temp = res
          this.email = this.temp.email
        })
      })
    }))
  }
  getData(type: string) {
    console.log(type);
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "gardening", "_rev", "date"]
    this.data.getByType(type, fields).subscribe(res => {
      console.log(res);
      this.response = res;
      this.typedData = this.response.doc
      console.log(this.typedData);
      for (var i = 0; i < length; i++) {
        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].gardening)
      }
      this.typedData.forEach((element: any) => {
        element['total'] = parseInt(element.cooling) + parseInt(element.gardening) + parseInt(element.useage)

        this.total = Number(this.typedData[i].useage) + Number(this.typedData[i].cooling) + Number(this.typedData[i].gardening)

      });
      var result = _.sumBy(this.typedData, function (Total: any) { return Total.total })
      console.log(result)
    })
  }
  ele() {
    this.router.navigate(['ele'])
  }
  water() {
    this.router.navigate(['water']);
  }
  gas() {
    this.router.navigate(['gas']);
  }
  renewable() {
    this.router.navigate(['renewable'])
  }
  adddata() {
    this.router.navigate(['adddata'])
  }
}
