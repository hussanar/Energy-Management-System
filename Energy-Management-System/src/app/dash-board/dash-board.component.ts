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
          this.localvalue = this.temp._id
          console.log(this.localvalue)
          localStorage.setItem("userdetails", this.localvalue)
          this.email = this.temp.email
          this.localObject = localStorage.getItem("userdetails")
          console.log(this.localObject)

        })
      })
    }))
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
  logout() {

  }
}
