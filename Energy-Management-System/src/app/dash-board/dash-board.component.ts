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
  total: any;
  localObject: any;
  localvalue: any;
  id: any;
  name: any;
  type: string | undefined
  value: any;
  arrayVal: any;
  length: any = 0;
  electricty: any;
  responseData: any;
  sample: any;
  viewVal: any = [];


  constructor(private router: Router, private Acrouter: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    this.Acrouter.queryParams.subscribe((params: any) => {
      console.log(params);
      this.id = params.data
      console.log(this.id);
      this.data.getDataByViewDoc('energy-management-login', 'water', this.localObject).subscribe(res => {
        console.log(res)
        this.responseData = res
        this.sample = this.responseData.rows
        console.log(this.sample);

        for (const iterator of this.sample) {
          this.viewVal.push(iterator.doc);
        }
        this.length = this.viewVal.length
        console.log(this.length)
      })

    })
    this.lengthOfArray()
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
          this.localvalue = this.temp._id
          console.log(this.localvalue)
          localStorage.setItem("userdetails", this.localvalue)
          this.email = this.temp.email
          this.name = this.temp.firstName
          this.localObject = localStorage.getItem("userdetails")
          console.log(this.localObject)

        })
      })
    }))
  }
  getDataByView(type: string) {

  }
  lengthOfArray() {
    this.type = "water";
    let fields: Array<string> = ["_id", "name", "useage", "cooling", "gardening", "_rev", "date", "user"]

    let userObject: any = localStorage.getItem('userData')
    let user = JSON.parse(userObject.toString())
    user['_id']
    console.log(user)
    this.data.getByTypedUser(this.type, fields, this.localObject).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
    })
    this.type = "electricty"
    this.data.getByTypedUser(this.type, fields, this.localObject).subscribe(res => {
      console.log(res)
      this.value = res;
      this.arrayVal = this.value.docs
      this.electricty = this.arrayVal.length
      console.log(this.length)
    })

  }
  ele() {
    this.router.navigate(['ele'], { queryParams: { data: this.localObject } })
  }
  water() {
    this.router.navigate(['water'], { queryParams: { data: this.localObject } });
  }
  gas() {
    this.router.navigate(['gas'], { queryParams: { data: this.localObject } });
  }
  renewable() {
    this.router.navigate(['renewable'], { queryParams: { data: this.localObject } })
  }
  adddata() {
    this.router.navigate(['adddata'], { queryParams: { data: this.localObject } })
  }
  logout() {

  }
  view() {
    this.router.navigate(['viwe'])
  }
}
